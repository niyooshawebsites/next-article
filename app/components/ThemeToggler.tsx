"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return(
    <div className="flex gap-2">
        <button></button>
    </div>
  )
}
