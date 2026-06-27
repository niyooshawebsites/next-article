import PostTable from "./post-table";
import {
  fetchAllPosts,
  searchDashboardPost,
  filterPostByCatetory,
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
  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const article_details = params.article_details;
  const cid = params.category;

  const session = await auth();

  const userId = session?.user.id;

  if (!userId) return;

  const postResponse = await fetchAllPosts(page, 10, userId);

  let searchPostResponse;
  if (article_details) {
    searchPostResponse = await searchDashboardPost(
      article_details,
      page,
      10,
      userId,
    );
  }

  const categoryResponse = await fetchAllCategories();

  let filterCategoryResponse;

  if (cid) {
    filterCategoryResponse = await filterPostByCatetory(cid, page, 10, userId);
  }

  let payload;

  if (article_details) {
    payload = searchPostResponse!.data ?? [];
  } else if (cid) {
    payload = filterCategoryResponse!.data ?? [];
  } else {
    payload = postResponse.data ?? [];
  }

  return (
    <main className="flex flex-col min-h-screen p-5">
      <h1 className="mb-4 text-2xl font-bold">All Articles</h1>
      <PostTable
        data={payload}
        pagination={
          searchPostResponse
            ? searchPostResponse.pagination
            : postResponse.pagination
        }
        currentPage={page}
        categories={categoryResponse?.data || []}
      />
    </main>
  );
}
