"use client";

import { ColumnDef } from "@tanstack/react-table";
import DeleteDataButton from "@/app/components/DeleteButton";
import { Checkbox } from "@/components/ui/checkbox";
import { deleteUser } from "@/app/actions/user-actions";

export interface User {
  id: string;
  name: string;
  email: string;
  post: number;
  comment: number;
  emailVerified: Date;
  createdAt: Date;
}

export const columns: ColumnDef<User>[] = [
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
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "Name",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "post",
    header: "Articles",
  },
  {
    accessorKey: "comment",
    header: "Comments",
  },
  {
    accessorKey: "emailVerified",
    header: "Verified",
    cell: ({ row }) =>
      row.original.emailVerified ? (
        <span className="bg-blue-200 px-2 py-1 rounded-lg text-blue-700">
          Yes
        </span>
      ) : (
        <span className="bg-red-200 px-2 py-1 text-red-700 rounded-lg">No</span>
      ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) =>
      new Date(row.original.createdAt).toLocaleDateString("en-IN"),
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const user = row.original;
      return <DeleteDataButton id={user.id} deleteData={deleteUser} />;
    },
  },
];
