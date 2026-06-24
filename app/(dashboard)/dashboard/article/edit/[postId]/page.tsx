import EditAritcleForm from "./EditAritcleForm";
import { findArticle } from "@/app/actions/post-actions";

interface Props {
  searchParams: {
    article?: string;
  };
}

export default async function EditArticle({ searchParams }: Props) {
  const params = await searchParams;
  const articleId = params.article;

  if (!articleId) {
    return <div>No Post Id</div>;
  }

  const res = await findArticle(articleId);
  const article = res.data;

  if (article) {
    return <div>Article not found</div>;
  }

  return <EditAritcleForm postId={articleId} article={article!} />;
}
