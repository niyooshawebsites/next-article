"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { deletePosts } from "@/app/actions/post-actions";

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
  TableFooter,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";

import PaginationComp from "@/app/components/PaginationComp";

interface PaginationMeta {
  page: number;
  pageSize: number;
  totalPosts: number;
  totalpages: number;
}

interface Props {
  data: Article[] | [];
  pagination: PaginationMeta;
  currentPage: number;
}

export default function ArticleTable({ data, pagination, currentPage }: Props) {
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
          <Table></Table>
        </>
      ) : (
        <span>No categories...</span>
      )}
    </>
  );
}
