import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

interface ActionState {
  success: boolean;
  msg: string;
}

export async function CreateCategory(
  prevState: ActionState,
  formData: FormData,
) {
  const name = (formData.get("title") as string)?.trim();

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

    if (!existingCategory) {
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
