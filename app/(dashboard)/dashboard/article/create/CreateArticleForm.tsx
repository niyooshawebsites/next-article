"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useActionState, useState, useEffect } from "react";
import { createPost } from "@/app/actions/post-actions";
import { getPresignedUrl } from "@/app/actions/upload-action";
import { toast } from "sonner";
import Image from "next/image";
import axios from "axios";

const initialState = {
  success: false,
  msg: "ghghg",
};

export default function CreateArticleForm() {
  const [state, formAction] = useActionState(createPost, initialState);

  const [imageKey, setImageKey] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    setPreviewUrl(URL.createObjectURL(file));

    try {
      setUploading(true);

      const res = await getPresignedUrl(file.name, file.type);

      await axios.put(res.uploadUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      setImageKey(res.key);
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  }
  useEffect((): void => {
    /* eslint-disable react-hooks/set-state-in-effect */
    if (!state.success) return;

    if (state.success) {
      setImageKey("");
    }

    if (state.success) {
      toast.success(state.msg, { position: "top-center" });
    } else {
      toast.error(state.msg, { position: "top-center" });
    }
  }, [state, imageKey]);
  /* eslint-enable react-hooks/set-state-in-effect */

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
            <FieldLabel htmlFor="imageKey">Upload Image</FieldLabel>
            <Input
              type="file"
              id="imageKey"
              accept="image/*"
              onChange={handleFileUpload}
              required
              className="border-gray-300 focus:outline-none focus:ring-0 focus-visible:ring-0 focus:border-gray-500"
            />

            <input type="hidden" name="imageUrl" value={imageKey} />

            {imageKey && (
              <div className="mt-4">
                <Image
                  src={previewUrl}
                  alt="preview"
                  width={300}
                  height={200}
                  className="rounded border"
                />
              </div>
            )}
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

          <Button
            type="submit"
            variant="default"
            disabled={uploading || !imageKey}
            className="cursor-pointer bg-gray-800 text-white hover:bg-gray-900"
          >
            {uploading ? "Uploading..." : "Create"}
          </Button>
        </form>
      </div>
    </div>
  );
}
