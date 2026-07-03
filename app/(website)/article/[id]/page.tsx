import { BlogHeader } from "@/app/components/BlogHeader";
import { BlogContent } from "@/app/components/BlogContent";
import { findArticle } from "@/app/actions/post-actions";
import { getSignedImageUrl } from "@/app/actions/fetch-file-action";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function page({ params }: Props) {
  const { id } = await params;
  const articleId = id;

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
    <main className="flex flex-col space-y-3 p-5">
      <BlogHeader
        title={articleWithSignedUrl.title}
        category={articleWithSignedUrl.category!.name}
        authorName={articleWithSignedUrl.author.name}
        authorEmail={articleWithSignedUrl.author.email}
        imageUrl={articleWithSignedUrl.imageUrl}
        createdAt={articleWithSignedUrl.createdAt}
      />
      <BlogContent
        id={articleWithSignedUrl.id}
        content={articleWithSignedUrl.content}
        published={articleWithSignedUrl.published}
      />
    </main>
  );
}
