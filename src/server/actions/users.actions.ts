"use server";

import prisma from "../config/prisma";
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
