"use client";

import {
  deleteCategories,
  deleteCategory,
} from "@/app/actions/category-action";
import { useRouter } from "next/navigation";

interface CategoryActionProps {
  categoryId: string;
  // refreshCategory: () => Promise<void>;
}

export default function CategoryActions({
  categoryId,
  // refreshCategory,
}: CategoryActionProps) {
  const router = useRouter();

  const handleDelete = async () => {
    await deleteCategory(categoryId);
    router.refresh();
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => router.push(`/dashboard/article/edit/${categoryId}`)}
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
