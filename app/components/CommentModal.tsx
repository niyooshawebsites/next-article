"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createComment } from "../actions/comment-action";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const initialState = {
  success: false,
  msg: "",
};

interface Props {
  postId: string;
}

export default function CommentModal({ postId }: Props) {
  const createCommentWithPostId = createComment.bind(null, postId);
  const [state, formAction] = useActionState(
    createCommentWithPostId,
    initialState,
  );

  useEffect(() => {
    if (!state.success) return;

    if (state.success) {
      toast.success(state.msg, { position: "top-center" });
    } else {
      toast.error(state.msg, { position: "top-center" });
    }
  }, [state]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="bg-blue-500 hover:bg-blue-600 cursor-pointer"
        >
          Write Comment
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <form className="space-y-3" action={formAction}>
          <DialogHeader>
            <DialogTitle>Add comment</DialogTitle>
            <DialogDescription>
              Write your heart out and share it with everyone.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <Textarea
                id="content"
                name="content"
                placeholder="Write your comment here"
              />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" className="cursor-pointer">
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
