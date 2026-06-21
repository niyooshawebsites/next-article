import { CategoryTable } from "./category-table";
import { fetchAllCategories } from "@/app/actions/category-action";

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function AllCategories({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page || 1);

  const res = await fetchAllCategories({ page, pageSize: 10 });
  const categories = res.data!;
  return (
    <main className="flex flex-col justify-between min-h-screen p-5 pb-24">
      <div>
        <h1 className="text-2xl font-bold mb-4 content-end">All Categories</h1>
        <CategoryTable data={categories} />
      </div>
    </main>
  );
}
