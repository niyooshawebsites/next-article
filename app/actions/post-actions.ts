"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

interface ActionState {
  success: boolean;
  msg: string;
}

// fetching all the articles
export async function getPosts() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return posts;
  } catch (err) {
    console.log(err);
  }
}

// creating articles
export async function createPost(prevState: ActionState, formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const session = await auth();
  console.log("SESSION SATRT...........................................");
  console.log(session);
  console.log("SESSION END...........................................");

  if (!session?.user?.id) {
    return {
      success: false,
      msg: "Unauthorized",
    };
  }

  if (!title || !content || !imageUrl) {
    return {
      success: false,
      msg: "Please fill out all the fields",
    };
  }
  try {
    // create the post
    await prisma.post.create({
      data: {
        title,
        content,
        imageUrl,
        authorId: session.user.id,
      },
    });

    return {
      success: true,
      msg: "Article created successfully",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      msg: "Failed to create article",
    };
  }
}
