"use client";

import { useState } from "react";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  PaginationState,
} from "@tanstack/react-table";
import { getColumns } from "./columns";

interface Category {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CategoryTableProps {
  data: Category[];
}

export function CategoryTable({ data }: CategoryTableProps) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [posts, setPosts] = useState<Category[]>([]);
  const [pageCount, setPageCount] = useState(0);

  const table = useReactTable({
    data: data,
    columns: getColumns(),
    rowCount: pageCount * pagination.pageSize,
    manualPagination: true,
    pageCount,
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
  });
  return (
    <>
      {data.length > 0 ? (
        <>
          <table className="w-full border">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="border border-gray-300 p-1 text-left"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="border border-gray-300 p-1">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </button>

            <span>
              Page {table.getState().pagination.pageIndex + 1} of {pageCount}
            </span>

            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <span>No articles yet...</span>
      )}
    </>
  );
}
