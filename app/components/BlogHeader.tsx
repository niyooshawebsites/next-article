import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays } from "lucide-react";
import CommentModal from "./CommentModal";
import { Share } from "./Share";

interface Props {
  title: string;
  category: string;
  authorName: string;
  authorImg: string | null;
  imageUrl: string;
  createdAt: Date;
}

export function BlogHeader({
  title,
  category,
  authorName,
  authorImg,
  imageUrl,
  createdAt,
}: Props) {
  return (
    <section>
      <div className="mt-5 flex justify-between items-center gap-6">
        <div>
          <h1 className="text-5xl font-bold tracking-tight leading-tight">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Badge className=" bg-blue-500">{category}</Badge>

          <Avatar>
            <AvatarImage src={`${{ authorImg }}`} />
            <AvatarFallback>{authorName[0].toUpperCase()}</AvatarFallback>
          </Avatar>

          <div>
            <p className="font-medium">{authorName}</p>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarDays size={16} /> {createdAt.toLocaleString()}
          </div>

          <Share title={title} />
        </div>
      </div>

      <div className="relative mt-5 aspect-video overflow-hidden rounded-xl">
        <Image src={imageUrl} alt={title} fill />
      </div>
    </section>
  );
}
