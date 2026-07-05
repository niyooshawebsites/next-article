"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

// fetch all the users
export async function fetchUsers(page = 1, pageSize = 10) {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: {
          not: 1,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * pageSize,
      take: pageSize, // take is same as mongodb limit(10)
    });

    const totalUsers = await prisma.user.count({
      where: {
        role: {
          not: 1,
        },
      },
    });

    return {
      success: true,
      msg: "Users fetched successfully",
      data: users,
      pagination: {
        page,
        pageSize,
        totalUsers,
        totalPages: Math.ceil(totalUsers / pageSize),
      },
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      msg: "Failed to fetch users",
      data: [],
    };
  }
}

// delete a user
export async function deleteUser(userId: string) {
  const session = await auth();

  if (session?.user.role !== 1) {
    return {
      success: false,
      msg: "Unauthorized Action",
    };
  }

  try {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    revalidatePath("/dashboard/users");

    return {
      success: true,
      msg: "User deleted successfully",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      msg: "Failed to delete user",
    };
  }
}

// delete users
export async function deleteUsers(userIds: string[]) {
  const session = await auth();

  if (session?.user.role !== 1) {
    return {
      success: false,
      msg: "Unauthorized Action",
    };
  }
  try {
    await prisma.user.deleteMany({
      where: {
        id: {
          in: userIds,
        },
      },
    });

    revalidatePath("/dashboard/users");

    return {
      success: true,
      msg: "Users deleted successfully",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      msg: "Failed to delete users",
    };
  }
}
