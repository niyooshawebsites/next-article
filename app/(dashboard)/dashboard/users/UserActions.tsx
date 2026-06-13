"use client";
import { deleteUser } from "@/app/actions/user-actions";
import { useRouter } from "next/navigation";

interface UserActionProps {
  userId: string;
}

export default function UserActions({ userId }: UserActionProps) {
  const router = useRouter();

  const handleDelete = async () => {
    await deleteUser(userId);
    router.refresh();
  };

  return (
    <div className="flex gap-2">
      <button className="text-red-500" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}
