import { BlogHeader } from "@/app/components/BlogHeader";
import { BlogContent } from "@/app/components/BlogContent";
import { BlogStatus } from "@/app/components/BlogStatus";
import { findArticle } from "@/app/actions/post-actions";
import { getSignedImageUrl } from "@/app/actions/fetch-file-action";
import { auth } from "@/lib/auth";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function page({ params }: Props) {
  const session = await auth();
  const { id } = await params;
  const articleId = id;

  if (!session) return;

  if (!articleId) {
    return <div>No Article Id</div>;
  }

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
    <main className="flex flex-col space-y-3">
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

      {session.user.role === 1 ? (
        <BlogStatus
          id={articleWithSignedUrl.id}
          published={articleWithSignedUrl.published}
        />
      ) : null}
    </main>
  );
}
