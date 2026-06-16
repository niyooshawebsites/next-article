"use client";

import { ColumnDef } from "@tanstack/react-table";
import PostActions from "./PostActions";
import type { Post } from "@/lib/generated/prisma/client";

export function getColumns(
  userRole: number,
  refreshPosts: () => Promise<void>,
): ColumnDef<Post>[] {
  return [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "title", header: "Title" },
    {
      accessorKey: "published",
      header: "Published",
      cell: ({ row }) => (row.original.published ? "Yes" : "No"),
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) =>
        new Date(row.original.createdAt).toLocaleDateString("en-IN"),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const post = row.original;
        return (
          <PostActions
            postId={post.id}
            published={post.published}
            userRole={userRole}
            refreshPosts={refreshPosts}
          />
        );
      },
    },
  ];
}
