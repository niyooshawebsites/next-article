import { fetchPusblishedPosts } from "@/app/actions/post-actions";
import ArticleCard from "@/app/components/ArticleCard";
import { getSignedImageUrl } from "@/app/actions/fetch-file-action";
import PaginationComp from "@/app/components/PaginationComp";

interface Props {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function PublishedBlogs({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  const res = await fetchPusblishedPosts({ page, pageSize: 10 });
  const totalPages = res.pagination!.totalPages;

  // posts with aws image link
  const postsWithImages = await Promise.all(
    res.data!.map(async (post) => ({
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-10">
        {postsWithImages?.map((post) => {
          return (
            <ArticleCard
              key={post.id}
              badge="Featured"
              title={post.title}
              description={post.content}
              imageLink={post.imageUrl}
              id={post.id}
            />
          );
        })}
      </div>
      <PaginationComp currentPage={page} totalPages={totalPages} />
    </main>
  );
}
