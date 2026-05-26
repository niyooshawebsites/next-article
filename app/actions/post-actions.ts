"use server";

import prisma from "@/lib/prisma";

// fetching all the posts
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
