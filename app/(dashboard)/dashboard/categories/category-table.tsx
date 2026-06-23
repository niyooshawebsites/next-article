"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { deleteCategories } from "@/app/actions/category-action";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  RowSelectionState,
} from "@tanstack/react-table";

import { columns, Category } from "./columns";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import PaginationComp from "@/app/components/PaginationComp";

interface PaginationMeta {
  page: number;
  pageSize: number;
  totalCategories: number;
  totalPages: number;
}

interface Props {
  data: Category[] | [];
  pagination: PaginationMeta;
  currentPage: number;
}

export default function CategoryTable({
  data,
  pagination,
  currentPage,
}: Props) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  const selectedIds = table
    .getSelectedRowModel()
    .rows.map((row) => row.original.id);

  return (
    <>
      {selectedIds.length > 0 && (
        <div className="mb-4">
          <Button
            variant="destructive"
            disabled={selectedIds.length === 0}
            onClick={async () => {
              const confirmation = confirm(
                "Do you really want to delete the data?",
              );
              if (!confirmation) return;
              await deleteCategories(selectedIds);
            }}
            className="text-red-500 cursor-pointer"
          >
            Delete Selected ({selectedIds.length})
          </Button>
        </div>
      )}

      {data.length > 0 ? (
        <>
          <Table className="p-3 w-full md:w-3/12">
            <TableHeader className="bg-gray-900 text-white">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} className="bg-gray-100 p-3">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-6">
                    No categories found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className="mt-5">
            <PaginationComp
              currentPage={currentPage}
              totalPages={pagination.totalPages}
            />
          </div>
        </>
      ) : (
        <span>No categories...</span>
      )}
    </>
  );
}
