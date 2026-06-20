"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

interface ActionState {
  success: boolean;
  msg: string;
}

// creating category
export async function CreateCategory(
  prevState: ActionState,
  formData: FormData,
) {
  const name = (formData.get("name") as string)?.trim();

  const session = await auth();

  if (!name) {
    return {
      success: false,
      msg: "Please fill out the details",
    };
  }

  if (!session?.user.id) {
    return {
      success: false,
      msg: "Unauthorized",
    };
  }

  try {
    const existingCategory = await prisma.category.findFirst({
      where: {
        name,
      },
    });

    if (existingCategory) {
      return {
        success: false,
        msg: "Category already exists",
      };
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug: name.split(" ").join("-"),
      },
    });

    return {
      success: true,
      msg: "Category created successfully",
      category,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      msg: "Failed to create category",
    };
  }
}

// fetching all categories
export async function fetchAllCategories({ page = 1, pageSize = 10 }) {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    if (categories.length == 0) {
      return {
        success: false,
        msg: "No cagetory found",
      };
    }

    const totalCategories = await prisma.category.count();

    return {
      success: true,
      msg: "Categories fetched successfully",
      data: categories,
      pagination: {
        page,
        pageSize,
        totalCategories,
        totalPages: Math.ceil(totalCategories / pageSize),
      },
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      msg: "Failed to fetch all categories",
    };
  }
}
