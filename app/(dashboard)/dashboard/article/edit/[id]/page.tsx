import EditAritcleForm from "./EditAritcleForm";
import { findArticle } from "@/app/actions/post-actions";
import { fetchAllCategories } from "@/app/actions/category-action";
import { getSignedImageUrl } from "@/app/actions/fetch-file-action";

interface Props {
  params: Promise<{
    id?: string;
  }>;
}

export default async function EditArticle({ params }: Props) {
  const { id } = await params;
  const articleId = id;

  if (!articleId) {
    return <div>No Article Id</div>;
  }

  const res = await findArticle(articleId);
  const article = res.data;

  if (!article) {
    return <div>Article not found</div>;
  }

  const articleWithPresignImageUrl = {
    ...article,
    imageUrl: await getSignedImageUrl(article?.imageUrl),
  };

  const response = await fetchAllCategories();
  const categories = response.data;

  return (
    <EditAritcleForm
      postId={articleId}
      article={articleWithPresignImageUrl!}
      categories={categories}
    />
  );
}
