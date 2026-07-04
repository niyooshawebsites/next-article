"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

export function SearchArticle() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (searchTerm) {
      params.set("article_details", searchTerm);
    } else {
      params.delete("article_details");
    }

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Post"
      />

      <Button type="submit">Search</Button>
    </form>
  );
}
