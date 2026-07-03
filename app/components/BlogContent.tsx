"use client";

import DOMPurify from "isomorphic-dompurify";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { togglePostStatus } from "../actions/post-actions";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  content: string;
  published: boolean;
}

export function BlogContent({ id, content, published }: Props) {
  const cleanContent = DOMPurify.sanitize(content);
  const router = useRouter();

  return (
    <Card>
      <CardContent>
        <div
          dangerouslySetInnerHTML={{
            __html: cleanContent,
          }}
        />
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button
          variant={"outline"}
          className="cursor-pointer"
          onClick={() => router.push("/dashboard/articles")}
        >
          Back
        </Button>
        <Button
          onClick={() => {
            togglePostStatus(id);
            router.push("/dashboard/articles");
          }}
          className="cursor-pointer"
        >
          {published ? "Draft" : "Publish"}
        </Button>
      </CardFooter>
    </Card>
  );
}
