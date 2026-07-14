"use client";

import { useState } from "react";
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
import { useRouter } from "next/navigation";

export function FrontendArticleSearch() {
  const [articleDetails, setArticleDetails] = useState<string>("");
  const [searchBy, setSearchBy] = useState<string>("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const params = new URLSearchParams({
      q: articleDetails,
      by: searchBy,
      page: "1",
    });

    router.push(`/articles?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        placeholder="Search Articles"
        onChange={(e) => setArticleDetails(e.target.value)}
        name="article_details"
        required
      />

      <Select onValueChange={setSearchBy} required>
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

      <input type="hidden" name="searchBy" value={searchBy} />

      <Button type="submit" variant="secondary">
        Search
      </Button>
    </form>
  );
}
