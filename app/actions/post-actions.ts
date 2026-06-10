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

// toggling publishing articles
export async function togglePostStatus(postId: string) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return {
        success: false,
        msg: "No post found",
      };
    }

    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        published: !post.published,
      },
    });

    return {
      success: true,
      msg: post.published
        ? "Article unpublished successfully"
        : "Article published successfully",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      msg: "Failed to publish article",
    };
  }
}

// delete the articles
export async function deletePost(postId: string) {
  try {
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    return {
      success: false,
      msg: "Article deleted successfully",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      msg: "Failed to delete article",
    };
  }
}

// edit the articles
export async function editPost(
  postId: string,
  prevState: ActionState,
  formData: FormData,
) {
  const title = formData.get("title");
  const imageUrl = formData.get("imageUrl");
  try {
    const article = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!article) {
      return {
        success: false,
        msg: "No article found",
      };
    }

    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title,
      },
    });
  } catch (err) {
    console.log(err);
    return {
      success: false,
      msg: "Failed to edit article",
    };
  }
}
