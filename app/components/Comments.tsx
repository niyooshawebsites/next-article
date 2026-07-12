import Image from "next/image";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
  ItemMedia,
} from "@/components/ui/item";
import { Prisma } from "@/lib/generated/prisma/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import PaginationComp from "./PaginationComp";

type CommentsWithRelations = Prisma.CommentGetPayload<{
  include: {
    author: {
      select: {
        name: true;
        image: true;
      };
    };
    post: {
      select: {
        title: true;
      };
    };
  };
}>;

interface Props {
  comments: CommentsWithRelations[];
  currentPage: number;
  totalPages: number;
}

export default async function Comments({
  comments,
  currentPage,
  totalPages,
}: Props) {
  return (
    <>
      {comments.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Comments: </CardTitle>
          </CardHeader>
          <CardContent>
            <ItemGroup className="gap-4">
              {comments.map((comment) => (
                <Item
                  key={comment.id}
                  variant="outline"
                  role="listitem"
                  asChild
                >
                  <>
                    <ItemMedia variant="image">
                      <Image
                        src={
                          comment.author.image
                            ? `${comment.author.image}`
                            : `/avatar.jpg`
                        }
                        alt={comment.post.title}
                        width={32}
                        height={32}
                        className="object-cover grayscale"
                      />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle className="line-clamp-1">
                        {comment.author.name}
                      </ItemTitle>
                      <ItemDescription>{comment.content}</ItemDescription>
                    </ItemContent>
                    <ItemContent className="flex-none text-center">
                      <ItemDescription>
                        {comment.createdAt.toLocaleDateString().split("Z")[0]}
                      </ItemDescription>
                    </ItemContent>
                  </>
                </Item>
              ))}
            </ItemGroup>
          </CardContent>
          <CardFooter>
            <PaginationComp currentPage={currentPage} totalPages={totalPages} />
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Comments: </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>No comments for this post yet!</CardDescription>
          </CardContent>
        </Card>
      )}
    </>
  );
}
