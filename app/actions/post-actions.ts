"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

interface PaginationMeta {
  page: number;
  pageSize: number;
  totalPosts: number;
  totalPages: number;
}

interface ActionState {
  success: boolean;
  msg: string;
  data?: [];
  pagination?: PaginationMeta;
}

// fetching all the articles
export async function fetchAllPosts(
  page: number = 1,
  pageSize: number = 10,
  userId: string,
) {
  try {
    let posts;
    let totalPosts;

    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        msg: "Unauthorized",
        data: [],
        pagination: {
          page: 1,
          pageSize,
          totalPosts: 0,
          totalPages: 1,
        },
      };
    }
    const isAdmin = session.user.role === 1;

    if (isAdmin) {
      posts = await prisma.post.findMany({
        orderBy: {
          createdAt: "desc",
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });

      totalPosts = await prisma.post.count();
    } else {
      posts = await prisma.post.findMany({
        where: {
          authorId: userId,
        },
        orderBy: {
          createdAt: "desc",
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });

      totalPosts = await prisma.post.count({
        where: {
          authorId: userId,
        },
      });
    }

    return {
      success: true,
      msg: "Successfully fetched articles",
      data: posts,
      pagination: {
        page,
        pageSize,
        totalPosts,
        totalPages: Math.ceil(totalPosts / pageSize) || 1,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      msg: "Failed to fetch articles",
      data: [],
      pagination: {
        page: 1,
        pageSize,
        totalPosts: 0,
        totalPages: 1,
      },
    };
  }
}

// fetching published articles
export async function fetchPusblishedPosts({ page = 1, pageSize = 10 }) {
  let totalPosts;
  let publisedPosts;

  try {
    publisedPosts = await prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    totalPosts = await prisma.post.count({
      where: {
        published: true,
      },
    });

    return {
      success: true,
      msg: "Fetched all published articles successfully",
      data: publisedPosts,
      pagination: {
        page,
        pageSize,
        totalPosts,
        totalPages: Math.ceil(totalPosts / pageSize) || 1,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      msg: "Failed to fetched published articles",
      data: [],
      pagination: {
        page,
        pageSize,
        totalPosts: 0,
        totalPages: 1,
      },
    };
  }
}

// creating articles
export async function createPost(prevState: ActionState, formData: FormData) {
  const categoryId = (formData.get("categoryId") as string)?.trim();
  const title = (formData.get("title") as string)?.trim();
  const imageUrl = (formData.get("imageUrl") as string)?.trim();
  const content = (formData.get("content") as string)?.trim();
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
        categoryId,
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
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      msg: "Unauthorized",
    };
  }

  const isAdmin = session.user.role === 1;

  if (!isAdmin) {
    return {
      success: false,
      msg: "Unauthorized.Not admin",
    };
  }

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

// delete article
export async function deletePost(postId: string) {
  const session = await auth();

  if (session?.user.role !== 1) {
    return {
      success: false,
      msg: "Unauthorized",
    };
  }

  try {
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    revalidatePath("/dashboard/articles");

    return {
      success: true,
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

// delete articles
export async function deletePosts(ids: string[]) {
  const session = await auth();

  if (session?.user.role !== 1) {
    return {
      success: false,
      msg: "Unauthorized",
    };
  }

  try {
    await prisma.post.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    revalidatePath("/dashboard/articles");

    return {
      success: true,
      msg: "Aricles deleted successfully",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      msg: "Failed to delete articles",
    };
  }
}

// edit the articles
export async function editPost(
  postId: string,
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const title = (formData.get("title") as string)?.trim();
  const imageUrl = (formData.get("imageUrl") as string)?.trim();
  const content = (formData.get("content") as string)?.trim();
  const session = await auth();

  if (!session?.user.id) {
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
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return {
        success: false,
        msg: "No article found",
      };
    }

    if (post.authorId !== session.user.id) {
      return {
        success: false,
        msg: "You are not authorized to edit this article",
      };
    }

    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title,
        imageUrl,
        content,
      },
    });

    return {
      success: true,
      msg: "Article updated successfully",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      msg: "Failed to edit article",
    };
  }
}

// find an article
export async function findArticle(postId: string) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return {
        success: false,
        msg: "No article found",
      };
    }

    return {
      success: true,
      msg: "Article found successfully",
      post,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      msg: "Failed to edit article",
    };
  }
}
