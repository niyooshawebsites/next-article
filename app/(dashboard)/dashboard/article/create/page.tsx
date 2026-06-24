import CreateArticleForm from "./CreateArticleForm";
import { fetchAllCategories } from "@/app/actions/category-action";

export default async function CreateArticle() {
  const res = await fetchAllCategories();
  const categories = res.data;

  return (
    <div className="flex flex-col justify-start min-h-screen">
      <h1 className="text-2xl font-bold mb-4 content-end">Create Article</h1>
      <CreateArticleForm categories={categories} />
    </div>
  );
}
