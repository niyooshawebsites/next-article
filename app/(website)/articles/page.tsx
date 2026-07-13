import {
  fetchPusblishedPosts,
  fetchPostsBySearchTermForWebsite,
} from "@/app/actions/post-actions";
import ArticleCard from "@/app/components/ArticleCard";
import { getSignedImageUrl } from "@/app/actions/fetch-file-action";
import PaginationComp from "@/app/components/PaginationComp";
import { FrontendArticleSearch } from "@/app/components/FrontendArticleSearch";

interface Props {
  searchParams: Promise<{
    page?: string;
    article_details?: string;
  }>;
}

export default async function PublishedBlogs({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const article_details = params.article_details;

  let res;

  if (article_details) {
    res = await fetchPostsBySearchTermForWebsite();
  }

  res = await fetchPusblishedPosts({ page, pageSize: 10 });
  const totalPages = res.pagination!.totalPages;
  const posts = res.data;

  // posts with aws image link
  const postsWithImages = await Promise.all(
    posts.map(async (post) => ({
      ...post,
      imageUrl: await getSignedImageUrl(post.imageUrl),
    })),
  );

  if (postsWithImages?.length == 0) {
    return (
      <main className="flex min-h-screen">
        <span>No posts yet...</span>
      </main>
    );
  }

  return (
    <main className="flex flex-col justify-between min-h-screen ">
      <section className="p-10">
        <FrontendArticleSearch />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-5">
          {postsWithImages?.map((post) => {
            return (
              <ArticleCard
                key={post.id}
                badge={`${post.category?.name}`}
                title={post.title}
                description={post.content}
                imageLink={post.imageUrl}
                id={post.id}
              />
            );
          })}
        </div>
      </section>

      <PaginationComp currentPage={page} totalPages={totalPages} />
    </main>
  );
}
