import { fetchAllCategories } from "@/app/actions/category-action";
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
    render: () => (
      <>
        <button>Edit</button>
        <button>Delete</button>
      </>
    ),
  },
];

export default async function CatetoryTable({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page || 1);

  const res = await fetchAllCategories({ page, pageSize: 10 });
  const categories = res.data;
  const totalPages = res.pagination!.totalPages;

  return (
    <main className="flex flex-col min-h-screen">
      <h1 className="text-2xl font-bold mb-4 content-end">Categories</h1>
      <TableComp columns={columns} data={categories} />
      <PaginationComp currentPage={page} totalPages={totalPages} />
    </main>
  );
}
