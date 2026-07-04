import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export async function FrontendArticleSearch() {
  return (
    <form action={"/articles"} className="flex gap-2">
      <Input
        type="text"
        placeholder="Search Post"
        name="article_details"
        required
      />
      <Button type="submit" variant="secondary">
        Search
      </Button>
    </form>
  );
}
