"use client";
import { togglePostStatus, deletePost } from "@/app/actions/post-actions";
import { useRouter } from "next/navigation";

interface PostActionProps {
  postId: string;
  published: boolean;
  userRole: number;
}

export default function PostActions({
  postId,
  published,
  userRole,
}: PostActionProps) {
  const router = useRouter();

  const handleToggle = async () => {
    await togglePostStatus(postId);
    router.refresh();
  };

  const handleDelete = async () => {
    await deletePost(postId);
    router.refresh();
  };

  return (
    <div className="flex gap-2">
      {userRole === 1 && (
        <button
          onClick={handleToggle}
          className="px-2 py-1 text-green-700 cursor-pointer"
        >
          {published ? "Unpublish" : "Publish"}
        </button>
      )}

      <button
        onClick={() => router.push(`/dashboard/article/edit/${postId}`)}
        className="px-2 py-1 text-blue-500 cursor-pointer"
      >
        Edit
      </button>

      <button
        onClick={handleDelete}
        className="px-2 py-1 text-red-500 cursor-pointer"
      >
        Delete
      </button>
    </div>
  );
}
