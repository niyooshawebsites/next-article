import EditAritcleForm from "./EditAritcleForm";
import { findArticle } from "@/app/actions/post-actions";

export default async function EditArticle({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const response = await findArticle(postId);
  const article = response.post;

  return <EditAritcleForm postId={postId} article={article} />;
}
