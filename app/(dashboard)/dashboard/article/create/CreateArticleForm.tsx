"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useActionState } from "react";
import { createPost } from "@/app/actions/post-actions";

const initialState = {
  success: false,
  msg: "",
};

export default function CreateArticleForm() {
  const [state, formAction] = useActionState(createPost, initialState);

  return (
    <div className="flex justify-center items-center w-10/12 border border-gray-300 rounded-lg">
      <div className="w-full bg-gray-50 p-5 rounded-lg space-y-3">
        <h1 className="text-2xl">Fill out the details to create an article</h1>

        <form action={formAction} className="space-y-4">
          <Field>
            <FieldLabel htmlFor="title">Article Title</FieldLabel>
            <Input
              type="text"
              id="title"
              name="title"
              required
              className="border-gray-300 focus:outline-none focus:ring-0 focus-visible:ring-0 focus:border-gray-500"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="imageUrl">Image Url</FieldLabel>
            <Input
              type="text"
              id="imageUrl"
              name="imageUrl"
              required
              className="border-gray-300 focus:outline-none focus:ring-0 focus-visible:ring-0 focus:border-gray-500"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="content">Article Content</FieldLabel>
            <Textarea
              id="content"
              name="content"
              required
              className="h-96 border-gray-300 focus:outline-none focus:ring-0 focus-visible:ring-0 focus:border-gray-500"
            />
          </Field>

          {state.success ? (
            <p className="text-success-500 text-sm">{state.msg}</p>
          ) : (
            <p className="text-danger-500 text-sm">{state.msg}</p>
          )}

          <Button
            type="submit"
            variant={"default"}
            className="cursor-pointer bg-gray-800 text-white hover:bg-gray-900"
          >
            Create
          </Button>
        </form>
      </div>
    </div>
  );
}
