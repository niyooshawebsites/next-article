import { ColumnDef } from "@tanstack/react-table";
import CategoryActions from "./CategoryActions";
import type { Category } from "@/lib/generated/prisma/client";

export function getColumns(): ColumnDef<Category>[] {
  return [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Category" },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const category = row.original;
        return <CategoryActions categoryId={category.id} />;
      },
    },
  ];
}
