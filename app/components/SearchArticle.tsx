import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchArticle() {
  return (
    <form action={"/dashboard/articles"} className="flex gap-2">
      <Input type="text" placeholder="Search Post" name="article_details" />
      <Button type="submit" variant="secondary">
        Search
      </Button>
    </form>
  );
}
