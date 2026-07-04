"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function SearchCategory() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (searchTerm) {
      params.set("category", searchTerm);
    } else {
      params.delete("category");
    }

    router.push(`${pathname}?${params.toString()}`);
    setSearchTerm("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={searchTerm}
        placeholder="Search Category"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button type="submit">Search</Button>
    </form>
  );
}
