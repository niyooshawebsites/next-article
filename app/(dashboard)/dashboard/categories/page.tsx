import {
  fetchAllCategories,
  deleteCategory,
} from "@/app/actions/category-action";
import PaginationComp from "@/app/components/PaginationComp";
import TableComp from "@/app/components/TableComp";
import type { Column } from "@/app/components/TableComp";

interface Props {
  searchParams: Promise<{ page?: string }>;
}

type Category = {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
};

const columns: Column<Category>[] = [
  {
    id: 1,
    header: "S.no",
    render: (_, index) => index + 1,
  },
  {
    id: 2,
    header: "Category",
    key: "name",
  },
  {
    id: 3,
    header: "Action",
    render: (row) => (
      <>
        <button>Edit</button>
        <form
          action={async () => {
            "use server";
            await deleteCategory(row.id);
          }}
        >
          <button type="submit">Delete</button>
        </form>
      </>
    ),
  },
];

export default async function CatetoryTable({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page || 1);

  const res = await fetchAllCategories({ page, pageSize: 10 });
  const categories = res.data!;
  const totalPages = res.pagination!.totalPages;

  return (
    <main className="flex flex-col justify-between min-h-screen p-5 pb-24">
      <div>
        <h1 className="text-2xl font-bold mb-4 content-end">Categories</h1>
        <TableComp columns={columns} data={categories} />
      </div>

      <PaginationComp currentPage={page} totalPages={totalPages} />
    </main>
  );
}
