import CategoryTable from "./category-table";
import {
  fetchCategoriesForDashboard,
  searchCategoryForDashbaord,
} from "@/app/actions/category-action";

interface Props {
  searchParams: Promise<{
    category?: string;
    page?: string;
  }>;
}

export default async function AllCategories({ searchParams }: Props) {
  const params = await searchParams;
  const category = params.category ?? null;
  const page = Number(params.page ?? 1);

  const res = await fetchCategoriesForDashboard({
    page,
    pageSize: 10,
  });

  return (
    <main className="flex flex-col min-h-screen p-5">
      <h1 className="mb-4 text-2xl font-bold">All Categories</h1>

      <CategoryTable
        data={res.data ?? []}
        pagination={res.pagination!}
        currentPage={page}
      />
    </main>
  );
}
