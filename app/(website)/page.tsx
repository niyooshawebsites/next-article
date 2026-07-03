import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="w-4/12 bg-gray-100 p-5 rounded-lg space-y-3">
        <h1 className="text-3xl">Welcome to Next Article</h1>
        <p>Explore our articles</p>
        <Link href="/articles">
          <Button
            className="bg-gray-900 hover:bg-gray-950 text-white cursor-pointer"
            variant={"secondary"}
          >
            Explore
          </Button>
        </Link>

        <h1 className="text-2xl my-3">OR</h1>

        <div className="space-y-3">
          <p>Write and share your own...</p>
          <div className="space-x-3">
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
    </div>
  );
}
