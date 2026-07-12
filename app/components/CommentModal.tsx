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

export default function CommentModal() {
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
        <form className="space-y-3">
          <DialogHeader>
            <DialogTitle>Add comment</DialogTitle>
            <DialogDescription>
              Write your heart out and share it with everyone.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <Textarea
                id="comment"
                name="comment"
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
