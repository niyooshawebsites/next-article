import { BlogHeader } from "@/app/components/BlogHeader";
import { BlogContent } from "@/app/components/BlogContent";
import { findArticle } from "@/app/actions/post-actions";
import { getSignedImageUrl } from "@/app/actions/fetch-file-action";
import CommentModal from "@/app/components/CommentModal";
import Comments from "@/app/components/Comments";
import { fetchAllComments } from "@/app/actions/comment-actions";

interface Props {
  params: Promise<{
    id: string;
    page: string;
  }>;
}

export default async function page({ params }: Props) {
  const { id } = await params;
  const { page } = await params;
  const articleId = id;
  const currentPage = Number(page) ?? 1;

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
      <CommentModal />
      <Comments
        comments={comments}
        currentPage={currentPage}
        totalPages={pagination.totalPages}
      />
    </main>
  );
}
