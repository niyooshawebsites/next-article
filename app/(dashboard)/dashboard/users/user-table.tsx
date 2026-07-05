"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { fetchUsers, deleteUsers } from "@/app/actions/user-actions";
import { SearchUser } from "@/app/components/SearchUser";
import { useRouter, useSearchParams } from "next/navigation";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  RowSelectionState,
} from "@tanstack/react-table";
import { columns, User } from "./columns";
import type { Post, Comment } from "@/lib/generated/prisma/client";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import PaginationComp from "@/app/components/PaginationComp";

interface PaginationMeta {
  page: number;
  pageSize: number;
  totalPosts: number;
  totalPages: number;
}

interface Props {
  data: User[];
  pagination: PaginationMeta;
  currentPage: number;
  posts: Post[] | [];
  comments: Comment[] | [];
}

export default function UserTable({
  data,
  pagination,
  currentPage,
  posts,
  comments,
}: Props) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const router = useRouter();
  const searchParams = useSearchParams();
  const user_details = searchParams.get("user_details");

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

  const selecteIds = table
    .getSelectedRowModel()
    .rows.map((row) => row.original.id);

  return (
    <>
      {selecteIds.length > 0 && (
        <div className="mb-4">
          <Button
            variant="destructive"
            disabled={selecteIds.length === 0}
            onClick={async () => {
              const confirmation = confirm(
                "Do you really want to delete the data?",
              );

              if (!confirmation) return;
              await deleteUsers(selecteIds);
            }}
          >
            Delete Selected {selecteIds.length}
          </Button>
        </div>
      )}

      {data.length > 0 ? (
        <>
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
                    No Users found...
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <PaginationComp
            currentPage={currentPage}
            totalPages={pagination.totalPages}
          />
        </>
      ) : (
        <span>No users...</span>
      )}
    </>
  );
}
