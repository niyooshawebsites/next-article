"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DeleteDataButton from "@/app/components/DeleteButton";
import { deletePost } from "@/app/actions/post-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { useSession } from "next-auth/react";

export interface Article {
  id: string;
  title: string;
  category: {
    id: string;
    name: string;
  } | null;
  createdAt: Date;
}

function ActionCell({ post }: { post: Article }) {
  const { data: session } = useSession();

  return (
    <div className="flex justify-center gap-2">
      <Link href={`/dashboard/article/edit/${post.id}`}>
        <Button size="sm" variant="outline" className="bg-blue-100">
          Edit
        </Button>
      </Link>

      {session?.user?.role === 1 && (
        <DeleteDataButton id={post.id} deleteData={deletePost} />
      )}
    </div>
  );
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
    cell: ({ row }) =>
      new Date(row.original.createdAt).toString().split(" GMT")[0],
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => <ActionCell post={row.original} />,
  },
];
