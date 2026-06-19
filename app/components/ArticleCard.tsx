import {
  Card,
  CardAction,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Post {
  badge: string;
  title: string;
  description: string;
  imageLink: string;
}

export default function ArticleCard({
  badge,
  title,
  description,
  imageLink,
}: Post) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0 border-0 self-start">
      <img
        src={imageLink}
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover"
      />
      <CardHeader className="">
        <CardAction>
          <Badge variant={"secondary"}>{badge}</Badge>
        </CardAction>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="line-clamp-3">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          className="w-full bg-gray-800 text-white hover:bg-gray-900 cursor-pointer"
          variant={"secondary"}
        >
          View more
        </Button>
      </CardFooter>
    </Card>
  );
}
