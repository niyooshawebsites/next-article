"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
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
  data: Category[];
  pagination: PaginationMeta;
  currentPage: number;
}

export default function CategoryTable({
  data,
  pagination,
  currentPage,
}: Props) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
  );
}
