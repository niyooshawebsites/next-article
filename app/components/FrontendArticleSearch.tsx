"use client";

import { useState, useEffect, useActionState } from "react";
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
import { fetchPostsBySearchTermForWebsite } from "../actions/post-actions";
import { toast } from "sonner";

const initialState = {
  success: false,
  msg: "",
};

export function FrontendArticleSearch() {
  const [state, formAction] = useActionState(
    fetchPostsBySearchTermForWebsite,
    initialState,
  );
  const [searchBy, setSearchBy] = useState<string>("");

  useEffect((): void => {
    /* eslint-disable react-hooks/set-state-in-effect */
    if (!state?.success) return;

    if (state.success) {
      toast.success(state.msg, { position: "top-center" });
    } else {
      toast.error(state.msg, { position: "top-center" });
    }
  }, [state]);
  /* eslint-enable react-hooks/set-state-in-effect */

  return (
    <form action={formAction} className="flex gap-2">
      <Input
        type="text"
        placeholder="Search Articles"
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
