"use server";

import prisma from "../config/prisma";

export const getAdminDashboardStatsAction = async () => {
  const categoriesCount = await prisma.category.count();
  const votesCount = await prisma.vote.count();
  const creatorCount = await prisma.creator.count();
  const creatorSubmissionsCount = await prisma.creator.count();

  return { categoriesCount, votesCount, creatorCount, creatorSubmissionsCount };
};

export const getAdminCategoriesStatsAction = async () => {
  const categoriesCount = await prisma.category.count();
  const activeCategories = await prisma.category.count({
    where: {
      isActive: true,
    },
  });
  const inactiveCategories = await prisma.category.count({
    where: {
      isActive: false,
    },
  });
  return { categoriesCount, activeCategories, inactiveCategories };
};

export async function getCreatorSubmissionsChartDataAction(
  period: "daily" | "weekly" | "monthly" | "yearly" = "monthly"
) {
  let startDate: Date;

  switch (period) {
    case "daily":
      startDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
      break;
    case "weekly":
      startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      break;
    case "monthly":
      startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      break;
    case "yearly":
      startDate = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
      break;
    default:
      startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  }

  // Get submissions grouped by date and category
  const submissions = await prisma.creatorSubmission.findMany({
    where: {
      createdAt: {
        gte: startDate,
      },
    },
    include: {
      category: true,
      votes: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  // Get total submissions for each category
  const categoryTotals = await prisma.category.findMany({
    select: {
      name: true,
      _count: {
        select: {
          creatorSubmission: true,
        },
      },
    },
  });

  // Format data for the chart
  const submissionsByDate = submissions.reduce((acc, submission) => {
    const date = submission.createdAt.toISOString().split("T")[0];
    if (!acc[date]) {
      acc[date] = {};
    }
    if (!acc[date][submission.category.name]) {
      acc[date][submission.category.name] = 0;
    }
    acc[date][submission.category.name]++;
    return acc;
  }, {} as Record<string, Record<string, number>>);

  // Convert to array format for the chart
  const chartData = Object.entries(submissionsByDate).map(
    ([date, categories]) => ({
      name: new Date(date).toLocaleDateString("en-US", { month: "short" }),
      ...categories,
    })
  );

  return {
    chartData,
    categoryTotals: categoryTotals.map((cat) => ({
      name: cat.name,
      total: cat._count.creatorSubmission,
    })),
  };
}
