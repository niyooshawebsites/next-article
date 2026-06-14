"use server";

import prisma from "@/lib/prisma";

interface ActionState {
  success: boolean;
  msg: string;
}

// fetch all the users
export async function fetchUsers() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      msg: "Users fetched successfully",
      data: users,
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
  try {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
  } catch (err) {
    console.log(err);
    return {
      success: false,
      msg: "Failed to delete user",
    };
  }
}
