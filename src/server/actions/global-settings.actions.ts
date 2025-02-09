"use server";

import prisma from "../config/prisma";
import { handleErrorResponse } from "../helper/error-utils";

export async function updateVotingEndDateSettingAction({
  votingEndDate,
}: {
  votingEndDate: Date;
}) {
  try {
    await prisma.globalSettings.upsert({
      where: { id: 1 },
      update: { votingEndDate: new Date(votingEndDate) },
      create: { votingEndDate: new Date(votingEndDate) },
    });

    return { message: "Updated Successfull", success: true };
  } catch (error) {
    return {
      error: { message: handleErrorResponse(error).message },
      success: false,
    };
  }
}

export const removeVotingEndDateSettingAction = async () => {
  try {
    await prisma.globalSettings.delete({
      where: { id: 1 },
    });

    return { message: "Deleted Successfull", success: true };
  } catch (error) {
    return {
      error: { message: handleErrorResponse(error, { withLog: true }).message },
      success: false,
    };
  }
};

export const getVotingEndDateSettingAction = async () => {
  const data = await prisma.globalSettings.findFirst({
    select: { votingEndDate: true },
  });

  return data?.votingEndDate;
};
