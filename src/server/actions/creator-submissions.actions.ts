"use server";
import prisma from "../config/prisma";


export const getSingleCategorySubmissionAction = async ({
  categoryId,
  creatorId,
}: {
  categoryId: string;
  creatorId: string;
}) => {
  const data = await prisma.creatorSubmission.findFirst({
    where: {
      categoryId,
      creatorId,
    },
    include: {
      creator: {
        select: {
          name: true,
          followers: true,
          profilePic: true,
          username: true,
        },
      },
    },
  });

  return data;
};

export const removeCreatorSubmissonFromCategoryAction = async ({
  creatorSubmissionId,
}: {
  creatorSubmissionId: number;
}) => {
  try {
    await prisma.creatorSubmission.delete({
      where: {
        id: creatorSubmissionId,
      },
    });

    return { message: "Removed successfully", success: true };
  } catch (error) {}
};
