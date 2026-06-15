"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  PaginationState,
} from "@tanstack/react-table";
import type { Post } from "@/lib/generated/prisma/client";
import { useState, useEffect } from "react";
import { fetchPosts } from "@/app/actions/post-actions";

interface DataTableProps {
  columns: ColumnDef<Post>[];
  userRole: number;
  userId: string;
}

export function PostTable({ columns, userRole, userId }: DataTableProps) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [posts, setPosts] = useState<Post[]>([]);
  const [pageCount, setPageCount] = useState(0);

  const table = useReactTable({
    data: posts,
    columns,
    rowCount: pageCount * pagination.pageSize,
    manualPagination: true,
    pageCount,
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
  });

  async function loadPosts(): Promise<void> {
    const res = await fetchPosts(
      pagination.pageIndex + 1,
      pagination.pageSize,
      userRole,
      userId,
    );

    if (res.success && res.pagination) {
      setPosts(res.data);
      setPageCount(res.pagination.totalPages);
    }
  }

  useEffect(() => {
    loadPosts();
  }, [pagination.pageIndex, pagination.pageSize]);

  return (
    <>
      {posts.length ? (
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
        <>
          <span>No articles yet...</span>
        </>
      )}
    </>
  );
}
