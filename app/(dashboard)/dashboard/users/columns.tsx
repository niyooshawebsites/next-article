"use client";
import { ColumnDef } from "@tanstack/react-table";
import UserActions from "./UserActions";

interface User {
  id: string;
  email: string;
  createdAt: Date;
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      new Date(row.original.createdAt).toLocaleString("en-IN");
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;
      return <UserActions userId={user.id} />;
    },
  },
];
