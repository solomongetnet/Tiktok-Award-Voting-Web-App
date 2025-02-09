"use server";

import { revalidatePath } from "next/cache";
import prisma from "../config/prisma";
import { handleErrorResponse } from "../helper/error-utils";
import { getAuthenticatedUserId } from "../helper/session";
import AuthGuard from "../helper/auth-guard";

interface ISubmitVote {
  creatorId: string;
  categoryId: string;
}

export const submitVoteAction = async ({
  creatorId,
  categoryId,
}: ISubmitVote) => {
  try {
    await AuthGuard();
    const userId = await getAuthenticatedUserId();

    if (!userId) {
      throw new Error("Please login first");
    }

    // Check if voting is allowed based on the votingEndDate
    const globalSettings = await prisma.globalSettings.findFirst();
    if (
      globalSettings?.votingEndDate &&
      new Date() > globalSettings.votingEndDate
    ) {
      throw new Error("Voting has ended. You can no longer submit votes.");
    }

    // Check if this user has already voted in this category
    const existingVoteInThisCategory = await prisma.vote.findFirst({
      where: {
        categoryId,
        userId,
      },
    });

    if (existingVoteInThisCategory) {
      throw new Error("You can only submit one vote in one category.");
    }

    // Check if the creator is valid in the specified category
    const creatorSubmission = await prisma.creatorSubmission.findFirst({
      where: {
        AND: {
          creatorId,
          categoryId,
        },
      },
    });

    if (!creatorSubmission) {
      throw new Error("We can't find this creator in this category.");
    }

    // Submit the vote
    await prisma.vote.create({
      data: {
        categoryId,
        userId,
        creatorSubmissionId: creatorSubmission?.id,
      },
    });

    revalidatePath(`/categories/${categoryId}`);
    revalidatePath(`/admin/categories/${categoryId}`);

    return { message: "Thanks for your vote", success: true };
  } catch (error) {
    return {
      error: { message: handleErrorResponse(error).message },
      success: false,
    };
  }
};

export const checkUserVoteStatus = async ({
  creatorSubmissionId,
  categoryId,
}: {
  creatorSubmissionId: number;
  categoryId: string;
}) => {
  await AuthGuard();
  const userId = await getAuthenticatedUserId();

  // Check if the user has already voted for the specified submission in the given category
  const existingVote = await prisma.vote.findFirst({
    where: {
      categoryId,
      creatorSubmissionId: creatorSubmissionId,
      userId,
    },
  });

  // Return the vote status
  return { voted: !!existingVote };
};
