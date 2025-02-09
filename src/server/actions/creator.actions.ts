"use server";

import { INewCreator, IUpdateCreator } from "@/interface/creator.interface";
import prisma from "../config/prisma";
import { handleErrorResponse } from "../helper/error-utils";
import RoleGuard from "../helper/role-guard";
import { revalidatePath } from "next/cache";
import { uploadToCloudinary } from "../config/cloudinary";

export const createNewCreatorAction = async (
  data: INewCreator,
  formData: FormData
) => {
  try {
    await RoleGuard(["ADMIN"]);
    const imageFile = formData.get("image") as Blob;

    const uploadResponse = await uploadToCloudinary(imageFile, "tiktok");
    const profilePic = uploadResponse?.secure_url;

    await prisma.creator.create({
      data: {
        name: data.name,
        description: data.description,
        username: data.username,
        followers: data.followers,
        profilePic: profilePic!,
      },
    });

    revalidatePath("/admin/creators");
    return { message: "Successfull", success: true };
  } catch (error) {
    return {
      error: { message: handleErrorResponse(error).message },
      success: false,
    };
  }
};

export const getCreatorsForAdminAction = async (searchTerm: string = "") => {
  try {
    await RoleGuard(["ADMIN"]);

    const creators = await prisma.creator.findMany({
      where: {
        OR: [
          { name: { contains: searchTerm } },
          { username: { contains: searchTerm } },
        ],
      },
      include: {
        _count: { select: { creatorSubmissions: true } },
      },
    });

    return { creators, success: true };
  } catch (error) {
    return {
      error: { message: handleErrorResponse(error).message },
      success: false,
    };
  }
};

export const getSingleCreatorForAdminAction = async ({
  creatorId,
}: {
  creatorId: string;
}) => {
  try {
    await RoleGuard(["ADMIN"]);

    const creatorData = await prisma.creator.findUnique({
      where: { id: creatorId },
    });

    return { data: creatorData, success: true };
  } catch (error) {
    return {
      error: { message: handleErrorResponse(error).message },
      success: false,
    };
  }
};

export const updateCreatorInformationAction = async ({
  creatorId,
  data,
}: {
  creatorId: string;
  data: IUpdateCreator;
}) => {
  try {
    await RoleGuard(["ADMIN"]);

    await prisma.creator.update({
      where: { id: creatorId },
      data: {
        name: data.name,
        description: data.description,
        username: data.username,
        followers: data.followers,
      },
    });

    revalidatePath("/admin/creators");
    return { success: true, message: "Successfully updated" };
  } catch (error) {
    return {
      error: { message: handleErrorResponse(error).message },
      success: false,
    };
  }
};

export const deleteCreatorAction = async ({
  creatorId,
}: {
  creatorId: string;
}) => {
  try {
    await RoleGuard(["ADMIN"]);

    await prisma.creator.delete({
      where: {
        id: creatorId,
      },
    });

    revalidatePath("/admin/creators");
    return { success: true, message: "Removed Successfully" };
  } catch (error) {
    return {
      error: { message: handleErrorResponse(error).message },
      success: false,
    };
  }
};

export const getCreatorCategorySubmissionsForAdminAction = async ({
  creatorId,
}: {
  creatorId: string;
}) => {
  try {
    await RoleGuard(["ADMIN"]);

    const data = await prisma.creatorSubmission.findMany({
      where: {
        creatorId,
      },
      include: {
        category: true,
        creator: true,
        _count: { select: { votes: true } },
      },
      orderBy: {
        votes: { _count: "desc" },
      },
    });

    return data;
  } catch (error) {
    return {
      error: { message: handleErrorResponse(error).message },
      success: false,
    };
  }
};

export const assignCreatorToCategoryAction = async ({
  creatorId,
  categoryId,
}: {
  creatorId: string;
  categoryId: string;
}) => {
  try {
    await RoleGuard(["ADMIN"]);

    // Check if the creator is already assigned to the category
    const existing = await prisma.creatorSubmission.findFirst({
      where: {
        creatorId,
        categoryId,
      },
    });

    if (existing) {
      throw new Error("Creator is already assigned to this category");
    }

    // Get category data to check maxEntries and the current count of creator submissions
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
      select: {
        maxEntries: true,
        creatorSubmission: true, // This will return the creator submissions for the category
      },
    });

    if (!category) {
      throw new Error("Category not found");
    }

    // Check if the category has reached the maximum entries
    if (category.creatorSubmission.length >= category.maxEntries) {
      throw new Error(
        "This category has reached the maximum number of entries"
      );
    }

    // Proceed with assigning the creator to the category
    await prisma.creatorSubmission.create({
      data: {
        creatorId,
        categoryId,
      },
    });

    revalidatePath(`/admin/categories/${categoryId}`);
    return { success: true, message: "Successfully assigned" };
  } catch (error) {
    return {
      error: { message: handleErrorResponse(error).message },
      success: false,
    };
  }
};

export const removeCreatorFromCategoryAction = async ({
  creatorId,
  categoryId,
}: {
  creatorId: string;
  categoryId: string;
}) => {
  try {
    await RoleGuard(["ADMIN"]);

    await prisma.creatorSubmission.deleteMany({
      where: {
        creatorId,
        categoryId,
      },
    });

    return { success: true, message: "Successfully removed" };
  } catch (error) {
    return {
      error: { message: handleErrorResponse(error).message },
      success: false,
    };
  }
};
