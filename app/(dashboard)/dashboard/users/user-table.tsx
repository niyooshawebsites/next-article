"use client";
import { useState, useEffect } from "react";
import { fetchUsers } from "@/app/actions/user-actions";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  PaginationState,
} from "@tanstack/react-table";
import type { User } from "@/lib/generated/prisma/client";

interface DataTableProps {
  columns: ColumnDef<User>[];
}

export default function UserTable({ columns }: DataTableProps) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [users, setUsers] = useState<User[]>([]);
  const [pageCount, setPageCount] = useState(0);

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    rowCount: pageCount * pagination.pageSize,
    manualPagination: true,
    pageCount,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
  });

  async function loadUsers(): Promise<void> {
    const res = await fetchUsers(pagination.pageIndex + 1, pagination.pageSize);

    if (res.success && res.pagination) {
      setUsers(res.data);
      setPageCount(res.pagination.totalPages);
    }
  }

  useEffect(() => {
    loadUsers();
  }, [pagination.pageIndex, pagination.pageSize]);

  return (
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
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
  );
}
