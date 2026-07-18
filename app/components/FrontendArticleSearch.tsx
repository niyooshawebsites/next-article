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
import { useSearchParams } from "next/navigation";

export function FrontendArticleSearch() {
  const [articleDetails, setArticleDetails] = useState<string>("");
  const [searchBy, setSearchBy] = useState<string>("");
  const router = useRouter();

  const params = useSearchParams();
  const q = params.get("q");
  const by = params.get("by");

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
    <div className="flex justify-center gap-2">
      <form onSubmit={handleSubmit} className="flex gap-2 flex-1">
        <Input
          type="text"
          placeholder="Search Articles"
          value={articleDetails}
          onChange={(e) => setArticleDetails(e.target.value)}
          name="q"
          required
        />

        <Select onValueChange={setSearchBy} required name="by">
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

        <Button
          type="submit"
          variant="outline"
          className="text-blue-500 hover:text-blue-600 cursor-pointer"
        >
          Search
        </Button>
      </form>

      {q || by ? (
        <Button
          type="button"
          variant={"default"}
          className="bg-red-500 text-white cursor-pointer hover:bg-red-600"
          onClick={() => router.push("/articles")}
        >
          Clear Filter
        </Button>
      ) : null}
    </div>
  );
}
