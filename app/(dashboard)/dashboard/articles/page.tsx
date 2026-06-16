// import { columns } from "./columns";
import { PostTable } from "./post-table";
import { auth } from "@/lib/auth";

export default async function AllPosts() {
  const session = await auth();
  const userRole = session!.user.role;
  const userId = session!.user.id;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Articles</h1>
      <PostTable userRole={userRole} userId={userId} />
    </div>
  );
}
