import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="w-4/12 bg-gray-100 p-5 rounded-lg space-y-3">
        <h1 className="text-3xl">Welcome to Next Article</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti
          odio quod ad nam in vitae consectetur! Nemo neque accusamus
          necessitatibus maiores officiis quam iusto id exercitationem
          temporibus, dolor sequi, quos sint quod reprehenderit quibusdam
          voluptate accusantium nobis? Maiores odio aliquam harum, unde sint
          quod, aut repellendus est tempora suscipit officiis.
        </p>
        <div className="space-x-2">
          <Link href="/login">
            <Button
              className="bg-gray-900 hover:bg-gray-950 text-white cursor-pointer"
              variant={"secondary"}
            >
              Login
            </Button>
          </Link>

          <Link href="/register">
            <Button variant={"outline"} className="cursor-pointer">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
