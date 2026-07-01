import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, Clock3 } from "lucide-react";

export default function BlogHeader() {
  return (
    <section>
      <Badge className="mb-4">Web Development</Badge>

      <h1 className="text-5xl font-bold tracking-tight leading-tight">
        Building Beautiful Blog Application with Next js
      </h1>

      <p className="mt-5 text-muted-foreground text-xl">
        Learn to create production ready blog pages using Next js, tailwind css
        and shadcn UI
      </p>
    </section>
  );
}
