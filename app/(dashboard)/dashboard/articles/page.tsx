import PostTable from "./post-table";
import {
  fetchAllPosts,
  searchDashboardPost,
  filterPostsByCatetoryForDashboard,
  fitlerPostsByCategoryAndSearchTermForDashboard,
} from "@/app/actions/post-actions";
import { fetchAllCategories } from "@/app/actions/category-action";
import { auth } from "@/lib/auth";

interface Props {
  searchParams: Promise<{
    page?: string;
    article_details?: string;
    category?: string;
  }>;
}

export default async function AllArticles({ searchParams }: Props) {
  let payload;
  let pagination;
  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const article_details = params.article_details;
  const cid = params.category;

  const session = await auth();
  const userId = session?.user.id;
  if (!userId) return;

  const categoryResponse = await fetchAllCategories();

  if (cid && article_details && page && userId) {
    const response = await fitlerPostsByCategoryAndSearchTermForDashboard(
      cid,
      article_details,
      page,
      10,
      userId,
    );
    payload = response.data ?? [];
    pagination = response.pagination;
  } else if (cid && page && userId) {
    const response = await filterPostsByCatetoryForDashboard(cid, page, 10, userId);
    payload = response.data ?? [];
    pagination = response.pagination;
  } else if (article_details && page && userId) {
    const response = await searchDashboardPost(
      article_details,
      page,
      10,
      userId,
    );
    payload = response.data ?? [];
    pagination = response.pagination;
  } else {
    const response = await fetchAllPosts(page, 10, userId);
    payload = response.data ?? [];
    pagination = response.pagination;
  }

  return (
    <main className="flex flex-col min-h-screen p-5">
      <h1 className="mb-4 text-2xl font-bold">All Articles</h1>
      <PostTable
        data={payload}
        pagination={pagination}
        currentPage={page}
        categories={categoryResponse?.data || []}
      />
    </main>
  );
}
