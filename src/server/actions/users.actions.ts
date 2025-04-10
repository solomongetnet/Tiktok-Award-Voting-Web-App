"use server";

import prisma from "../config/prisma";
import { handleErrorResponse } from "../helper/error-utils";
import RoleGuard from "../helper/role-guard";

export const getUsersForAdminAction = async ({
  query,
  role,
}: {
  query?: string;
  role?: string;
}) => {
  try {
    await RoleGuard(["ADMIN"]);
    const where: any = {};
    if (query && query.trim() !== "") {
      const searchQuery = query.toLowerCase();

      where.OR = [
        { name: { contains: searchQuery } },
        { email: { contains: searchQuery } },
      ];
    }

    if (role) {
      where.role = role;
    }

    const users = await prisma.user.findMany({
      where,
      include: { _count: { select: { votes: true } } },
    });

    users.map((user) => {
      user.password = null;
    });

    return users;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const changeUserRoleAction = async ({
  userId,
  newRole,
}: {
  userId: string;
  newRole: "ADMIN" | "USER";
}) => {
  try {
    // Only ADMIN can change roles
    await RoleGuard(["ADMIN"]);

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new Error("User not found");
    }

    // Prevent changing role if already the same
    if (user.role === newRole) {
      throw new Error("User already has this role");
    }

    // Update user role
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    // Hide sensitive info
    updatedUser.password = null;

    return {
      message: "User role updated successfully",
      success: true,
      data: { newRole },
    };
  } catch (error) {
    return {
      error: { message: handleErrorResponse(error).message },
      success: false,
    };
  }
};
