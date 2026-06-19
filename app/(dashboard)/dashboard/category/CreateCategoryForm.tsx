"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { CreateCategory } from "@/app/actions/category-action";

const initialState = {
  success: false,
  msg: "",
};

export default function CreateCategoryForm() {
  const [state, formAction] = useActionState(CreateCategory, initialState);

  return (
    <div className="flex justify-center items-center w-10/12 border border-gray-300 rounded-lg">
      <div className="w-full bg-gray-50 p-5 rounded-lg space-y-3">
        <h1>Fill out the details to create a category</h1>
        <form action={formAction}>
            <Field>
                <FieldLabel>Category name: </FieldLabel>
            </Field>
        </form>
      </div>
      CreateCategoryForm
    </div>
  );
}
