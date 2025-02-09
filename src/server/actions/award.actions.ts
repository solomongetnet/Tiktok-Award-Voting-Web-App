"use server";

import { revalidatePath } from "next/cache"; // For revalidating pages if needed
import prisma from "../config/prisma";
import { handleErrorResponse } from "../helper/error-utils";

interface UpsertAwardEventInput {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  isActive?: boolean; // Optional; defaults to `true`
}

export const upsertAwardEventAction = async (input: UpsertAwardEventInput) => {
  try {
    const { name, description, startDate, endDate, isActive = true } = input;
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    if (parsedStartDate >= parsedEndDate) {
      throw new Error("Start date must be before the end date.");
    }

    const awardEvent = await prisma.awardEvent.upsert({
      where: { id: 1 },
      update: {
        name,
        description,
        startDate: parsedStartDate,
        endDate: parsedEndDate,
        isActive,
      },
      create: {
        id: 1,
        name,
        description,
        startDate: parsedStartDate,
        endDate: parsedEndDate,
        isActive,
      },
    });

    // Revalidate paths if necessary
    revalidatePath("/award-event"); // Example path, adjust as needed
    revalidatePath("/");

    return {
      message: `Award event "${awardEvent.name}" has been ${
        awardEvent.createdAt === awardEvent.updatedAt ? "created" : "updated"
      }.`,
      success: true,
    };
  } catch (error) {
    return {
      error: { message: handleErrorResponse(error) },
      success: false,
    };
  }
};

export const getAwardEventAction = async () => {
  const awardEvent = await prisma.awardEvent.findUnique({
    where: { id: 1 },
  });

  return awardEvent;
};
