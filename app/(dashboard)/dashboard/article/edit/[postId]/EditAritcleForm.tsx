"use client";
import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { editPost } from "@/app/actions/post-actions";

const initialState = {
  success: false,
  msg: "",
};

interface ArticleProps {
  id: string;
  title: string;
  imageUrl: string;
  content: string;
}

interface EditArticleFormProps {
  postId: string;
  article: ArticleProps;
}

export default function EditAritcleForm({
  postId,
  article,
}: EditArticleFormProps) {
  const editPostWithId = editPost.bind(null, postId);
  const [state, formAction] = useActionState(editPostWithId, initialState);

  const [imageUrl, setImageUrl] = useState(article.imageUrl);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex justify-center items-center w-10/12 border border-gray-300 rounded-lg">
      <div className="w-full bg-gray-50 p-5 rounded-lg space-y-3">
        <h1 className="text-2xl">Fill out the details to update the article</h1>

        <form action={formAction} className="space-y-4">
          <Field>
            <FieldLabel htmlFor="title">Article Title</FieldLabel>
            <Input
              type="text"
              id="title"
              name="title"
              required
              className="border-gray-300 focus:outline-none focus:ring-0 focus-visible:ring-0 focus:border-gray-500"
              defaultValue={article.title}
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
              defaultValue={article.imageUrl}
              onChange={(e) => {
                setImageUrl(e.target.value);
                setImageError(false);
              }}
            />

            {imageUrl && (
              <div className="mt-4">
                <img
                  src={imageUrl}
                  alt="Article preview"
                  width={300}
                  className="rounded border"
                  onError={() => setImageError(true)}
                />
              </div>
            )}

            {imageError && (
              <p className="text-red-500 text-sm mt-2">
                This image cannot be displayed. The URL may be invalid or the
                remote server may block image loading.
              </p>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="content">Article Content</FieldLabel>
            <Textarea
              id="content"
              name="content"
              required
              className="h-96 border-gray-300 focus:outline-none focus:ring-0 focus-visible:ring-0 focus:border-gray-500"
              defaultValue={article.content}
            />
          </Field>

          {state.msg && (
            <p
              className={`text-sm ${
                state.success ? "text-green-600" : "text-red-600"
              }`}
            >
              {state.msg}
            </p>
          )}

          <Button
            type="submit"
            variant={"default"}
            className="cursor-pointer bg-gray-800 text-white hover:bg-gray-900"
          >
            Update
          </Button>
        </form>
      </div>
    </div>
  );
}
