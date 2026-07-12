import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="w-6/12 bg-gray-100 p-5 rounded-lg space-y-3">
        <h1 className="text-4xl text-blue-500 mb-10">
          Welcome to Next Article
        </h1>
        <h2 className="text-2xl">
          Discover Stories That Inspire, Inform, and Empower
        </h2>
        <p>
          Explore a growing collection of articles covering wildlife,
          sustainability, technology, education, health, and more. Stay
          informed, learn something new, and discover ideas that matter.
        </p>
        <Link href="/articles">
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
            variant={"secondary"}
          >
            Explore Articles
          </Button>
        </Link>

        <h1 className="text-2xl my-5 text-red-500">OR</h1>

        <div className="space-y-3">
          <h2 className="text-2xl">Share Your Knowledge with the Community</h2>
          <p>
            Have a story to tell or expertise to share? Create an account to
            publish your own articles, connect with readers, and contribute
            meaningful content.
          </p>
          <div className="space-x-3">
            <Link href="/login">
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
                variant={"secondary"}
              >
                Login
              </Button>
            </Link>

            <Link href="/register">
              <Button variant={"outline"} className="cursor-pointer">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
