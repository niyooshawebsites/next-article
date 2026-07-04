"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { deletePosts } from "@/app/actions/post-actions";
import { SearchArticle } from "@/app/components/SearchArticle";
import { FilterByCategory } from "@/app/components/FilterByCategory";
import type { Category } from "@/lib/generated/prisma/client";

import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  RowSelectionState,
} from "@tanstack/react-table";

import { columns, Article } from "./columns";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";

import PaginationComp from "@/app/components/PaginationComp";

interface PaginationMeta {
  page: number;
  pageSize: number;
  totalPosts: number;
  totalPages: number;
}

interface Props {
  data: Article[];
  pagination?: PaginationMeta;
  currentPage: number;
  categories: Category[] | [];
}

export default function ArticleTable({
  data,
  pagination,
  currentPage,
  categories,
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
              await deletePosts(selectedIds);
            }}
            className="text-red-500 cursor-pointer"
          >
            Delete Selected ({selectedIds.length})
          </Button>
        </div>
      )}

      {data.length > 0 ? (
        <>
          <div className="flex gap-2 mb-5">
            <FilterByCategory categories={categories} />
            <SearchArticle />
          </div>

          <Table className="p-3 w-full">
            <TableHeader>
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
                  <TableRow key={row.id}>
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
                    No Posts found...
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <PaginationComp
            currentPage={currentPage}
            totalPages={pagination!.totalPages}
          />
        </>
      ) : (
        <span>No categories...</span>
      )}
    </>
  );
}
