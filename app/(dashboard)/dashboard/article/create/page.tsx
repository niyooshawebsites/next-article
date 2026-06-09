import CreateArticleForm from "./CreateArticleForm";

export default function CreateArticle() {
  return (
    <div className="flex flex-col justify-start min-h-screen">
      <h1 className="text-2xl font-bold mb-4 content-end">Create Article</h1>
      <CreateArticleForm />
    </div>
  );
}
