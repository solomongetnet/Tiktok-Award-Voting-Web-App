"use server";

import prisma from "../config/prisma";
import { INewCategory, IUpdateCategory } from "@/interface/category.interface";
import { handleErrorResponse } from "../helper/error-utils";
import { revalidatePath } from "next/cache";
import RoleGuard from "../helper/role-guard";
import { getAuthenticatedUserId } from "../helper/session";

export const getCategoriesForAdminAction = async () => {
  const data = await prisma.category.findMany({
    include: { _count: { select: { creatorSubmission: true } } },
  });

  return data;
};

export const getCategoriesForCreatorSettingAction = async () => {
  const data = await prisma.category.findMany();

  return data;
};

export const getAllCategoriesForClientAction = async () => {
  const data = await prisma.category.findMany({
    include: { _count: { select: { creatorSubmission: true } } },
    where: { isActive: true },
  });

  // Filter out categories with no submissions
  const filteredCategories = data.filter(
    (category) => category._count.creatorSubmission > 0
  );

  return filteredCategories;
};

export const getSingleCategoryForAdminAction = async ({
  categoryId,
}: {
  categoryId: string;
}) => {
  await RoleGuard(["ADMIN"]);

  const data = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  return data;
};

export const createNewCategoryAction = async (data: INewCategory) => {
  try {
    await RoleGuard(["ADMIN"]);

    await prisma.category.create({
      data: {
        color: data.color,
        icon: data.icon,
        name: data.name,
        description: data.description,
        isActive: data.isActive,
        maxEntries: data.maxEntries,
      },
    });

    revalidatePath("/admin/categories");
    return { message: "Successfull", success: true };
  } catch (error) {
    return {
      error: { message: handleErrorResponse(error).message },
      success: false,
    };
  }
};

export const deleteCategoryAction = async ({
  categoryId,
}: {
  categoryId: string;
}) => {
  try {
    await RoleGuard(["ADMIN"]);

    await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });

    revalidatePath("/admin/categories");
    return { message: "Deleted Successfull", success: true };
  } catch (error) {
    return {
      error: { message: handleErrorResponse(error).message },
      success: false,
    };
  }
};

export const updateCategoryAction = async ({
  categoryId,
  data,
}: {
  categoryId: string;
  data: IUpdateCategory;
}) => {
  try {
    await RoleGuard(["ADMIN"]);

    await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        color: data.color,
        icon: data.icon,
        name: data.name,
        description: data.description,
        isActive: data.isActive,
        maxEntries: data.maxEntries,
      },
    });

    revalidatePath("/admin/categories");
    return { message: "Updated Successfull", success: true };
  } catch (error) {
    return {
      error: { message: handleErrorResponse(error).message },
      success: false,
    };
  }
};

export const getUnavailableCategoryColorsAction = async () => {
  const takenColors = await prisma.category
    .findMany({
      select: {
        color: true,
      },
    })
    .then((result) => result.map((category) => category.color));

  console.log(takenColors);
  return takenColors;
};

export const getSingleCategoryDataAction = async ({
  categoryId,
  searchQuery,
}: {
  categoryId: string;
  searchQuery: string;
}) => {
  try {
    // Fetch Global Settings to check the voting end date
    const globalSettings = await prisma.globalSettings.findFirst();

    let votingEndedMessage = null;

    if (
      globalSettings?.votingEndDate &&
      new Date() > globalSettings.votingEndDate
    ) {
      votingEndedMessage =
        "The voting period has ended. You can no longer vote.";
    }

    // Fetch creator submissions data
    const creatorsSubmissionsData = await prisma.creatorSubmission.findMany({
      where: {
        categoryId,
        category: { isActive: true },
        OR: [
          { creator: { name: { contains: searchQuery } } },
          { creator: { username: { contains: searchQuery } } },
        ],
      },
      include: { _count: { select: { votes: true } }, creator: true },
      orderBy: {
        votes: { _count: "desc" },
      },
    });

    // Fetch category info
    const categoryInfo = await prisma.category.findUnique({
      where: {
        id: categoryId,
        isActive: true,
      },
      select: {
        name: true,
        description: true,
        isActive: true,
      },
    });

    const userId = await getAuthenticatedUserId();

    let votedCreatorSubmission = null;

    // Find the submission the user voted for in the current category
    if (userId) {
      votedCreatorSubmission = await prisma.creatorSubmission.findFirst({
        where: {
          categoryId,
          votes: {
            some: { userId },
          },
        },
        include: { _count: { select: { votes: true } }, creator: true },
        orderBy: {
          votes: { _count: "desc" },
        },
      });
    }

    // Rearrange the submissions to place the voted one first
    let orderedSubmissions = creatorsSubmissionsData;

    if (votedCreatorSubmission) {
      orderedSubmissions = [
        votedCreatorSubmission,
        ...creatorsSubmissionsData.filter(
          (submission) => submission.id !== votedCreatorSubmission.id
        ),
      ];
    }

    return {
      creatorsSubmissionsData: orderedSubmissions,
      categoryInfo,
      votedCreatorSubmission,
      votingEndedMessage, // Include the voting ended message in the response
    };
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while fetching category data.");
  }
};

export const getCategoryParticipantsAction = async ({
  categoryId,
}: {
  categoryId: string;
}) => {
  const participants = await prisma.creatorSubmission.findMany({
    where: {
      categoryId,
    },
    include: {
      _count: { select: { votes: true } },
      creator: true,
    },
    orderBy: {
      votes: { _count: "desc" },
    },
  });

  // Sort participants by vote count in descending order
  const sortedParticipants = participants.sort(
    (a, b) => b._count.votes - a._count.votes
  );

  // Add ranking based on vote count
  const rankedParticipants = sortedParticipants.map((participant, index) => ({
    ...participant,
    rank: index + 1, // Rank starts at 1
  }));

  return rankedParticipants;
};
