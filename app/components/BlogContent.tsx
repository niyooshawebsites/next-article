import DOMPurify from "isomorphic-dompurify";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface Props {
  content: string;
}

export function BlogContent({ content }: Props) {
  const cleanContent = DOMPurify.sanitize(content);
  return (
    <Card>
      <CardContent>
        <div
          dangerouslySetInnerHTML={{
            __html: cleanContent,
          }}
        />
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant={"outline"}>Draft</Button>
        <Button>Publish</Button>
      </CardFooter>
    </Card>
  );
}
