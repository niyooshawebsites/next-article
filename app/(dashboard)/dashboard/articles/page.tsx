import { getPosts } from "@/app/actions/post-actions";
import { columns } from "./columns";
import { PostTable } from "./post-table";

export default async function AllPosts() {
  const res = await getPosts();
  const posts = res.data;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Articles</h1>

      {posts?.length ? (
        <PostTable columns={columns} data={posts ?? []} />
      ) : (
        <span>No articles yet...</span>
      )}
    </div>
  );
}
