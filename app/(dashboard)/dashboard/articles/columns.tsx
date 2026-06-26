"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DeleteDataButton from "@/app/components/DeleteButton";
import { deletePost } from "@/app/actions/post-actions";
import { Checkbox } from "@/components/ui/checkbox";

export interface Article {
  id: string;
  title: string;
  category: {
    id: string;
    name: string;
  } | null;
  createdAt: Date;
}

export const columns: ColumnDef<Article>[] = [
  {
    id: "Select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
  },
  {
    id: "Serial",
    header: "S.No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "title",
    header: "Article Title",
  },
  {
    accessorKey: "category.name",
    header: "Category",
    cell: ({ row }) => row.original.category?.name ?? "No Category",
  },
  {
    accessorKey: "createdAt",
    header: "Published on",
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const post = row.original;
      return (
        <div className="flex justify-center gap-2">
          <Link href={`/dashboard/article/edit/${post.id}`}>
            <Button size="sm" variant="outline">
              Edit
            </Button>
          </Link>

          <DeleteDataButton id={post.id} deleteData={deletePost} />
        </div>
      );
    },
  },
];
