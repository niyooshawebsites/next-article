import { BlogHeader } from "@/app/components/BlogHeader";
import { BlogContent } from "@/app/components/BlogContent";
import { findArticle } from "@/app/actions/post-actions";
import { getSignedImageUrl } from "@/app/actions/fetch-file-action";
import CommentModal from "@/app/components/CommentModal";
import Comments from "@/app/components/Comments";
import { fetchAllComments } from "@/app/actions/comment-action";
import { Metadata } from "next";

interface Props {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

// attaching meta data for sharing purpose
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const res = await findArticle(id);
  const article = res.data;

  if (!article) {
    return {
      title: "Article not found",
    };
  }

  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${article.id}`;

  return {
    title: article.title,
    description: article.content.slice(0, 160),

    openGraph: {
      title: article.title,
      description: article.content.slice(0, 160),
      url,
      type: "article",
      images: [
        {
          url: article.imageUrl,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.content.slice(0, 160),
      images: [article.imageUrl],
    },
  };
}

export default async function page({ params, searchParams }: Props) {
  const { id } = await params;
  const { page } = await searchParams;
  const articleId = id;
  const currentPage = Number(page ?? 1);

  if (!articleId) {
    return <div>No Article Id</div>;
  }

  const commentsRes = await fetchAllComments(articleId, currentPage);
  const comments = commentsRes.data;
  const pagination = commentsRes.pagination;

  const res = await findArticle(id);
  const article = res.data;

  if (!article) {
    return <div>Article not found</div>;
  }

  const articleWithSignedUrl = {
    ...article,
    imageUrl: await getSignedImageUrl(article.imageUrl),
  };

  return (
    <main className="flex flex-col space-y-3 p-5">
      <BlogHeader
        title={articleWithSignedUrl.title}
        category={articleWithSignedUrl.category!.name}
        authorName={articleWithSignedUrl.author.name}
        authorImg={articleWithSignedUrl.author.image}
        imageUrl={articleWithSignedUrl.imageUrl}
        createdAt={articleWithSignedUrl.createdAt}
      />
      <BlogContent
        id={articleWithSignedUrl.id}
        content={articleWithSignedUrl.content}
        published={articleWithSignedUrl.published}
      />
      <CommentModal postId={articleWithSignedUrl.id} />
      <Comments
        comments={comments}
        currentPage={currentPage}
        totalPages={pagination.totalPages}
      />
    </main>
  );
}
