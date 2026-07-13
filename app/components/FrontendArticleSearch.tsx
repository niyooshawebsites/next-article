import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export async function FrontendArticleSearch() {
  return (
    <form action={"/articles"} className="flex gap-2">
      <Input
        type="text"
        placeholder="Search Articles"
        name="article_details"
        required
      />

      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Search By" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="post">Article</SelectItem>
            <SelectItem value="user">User</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button type="submit" variant="secondary">
        Search
      </Button>
    </form>
  );
}
