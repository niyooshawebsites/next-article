import PostTable from "./post-table";
import { fetchAllPosts } from "@/app/actions/post-actions";
import { auth } from "@/lib/auth";

interface Props {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function AllArticles({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const session = await auth();

  const userId = session?.user.id;
  if (!userId) return;

  const res = await fetchAllPosts(page, 10, userId);

  return (
    <main className="flex flex-col min-h-screen p-5">
      <h1 className="mb-4 text-2xl font-bold">All Articles</h1>
      <PostTable
        data={res.data ?? []}
        pagination={res.pagination}
        currentPage={page}
      />
    </main>
  );
}
