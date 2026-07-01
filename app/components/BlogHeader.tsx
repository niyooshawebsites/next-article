import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays } from "lucide-react";

interface Props {
  title: string;
  category: string;
  authorName: string;
  authorEmail: string;
  imageUrl: string;
  createdAt: Date;
}

export function BlogHeader({
  title,
  category,
  authorName,
  authorEmail,
  imageUrl,
  createdAt,
}: Props) {
  return (
    <section>
      <Badge className="mb-4 bg-blue-500">{category}</Badge>

      <h1 className="text-5xl font-bold tracking-tight leading-tight">
        {title}
      </h1>

      <div className="mt-8 flex items-center gap-6">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="avatar.jgg" />
            <AvatarFallback>AJ</AvatarFallback>
          </Avatar>

          <div>
            <p className="font-medium">{authorName}</p>
            <p className="text-muted-foreground text-sm">{authorEmail}</p>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarDays size={16} /> {createdAt.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="relative mt-10 aspect-video overflow-hidden rounded-xl">
        <Image src={imageUrl} alt="Image" fill />
      </div>
    </section>
  );
}
