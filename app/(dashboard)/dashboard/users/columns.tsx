"use client";
import { ColumnDef } from "@tanstack/react-table";
import UserActions from "./UserActions";
import type { User } from "@/lib/generated/prisma/client";

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
    cell: ({ row }) =>
      new Date(row.original.createdAt).toLocaleDateString("en-IN"),
  },
  {
    accessorKey: "emailVerified",
    header: "Verified",
    cell: ({ row }) => (row.original.emailVerified ? "Yes" : "No"),
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
