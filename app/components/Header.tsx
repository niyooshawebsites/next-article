import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { UserCheck, UserPlus } from "lucide-react";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-3 py-2 bg-gray-100">
      <div>
        <Link href="/">
          <h1 className="yesteryear-regular text-4xl" style={{}}>
            Next Articles
          </h1>
        </Link>
      </div>
      <nav className="flex">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/" className="cursor-pointer hover:font-bold">
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/blogs" className="cursor-pointer hover:font-bold">
                  Blogs
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem></NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              className="bg-gray-900 hover:bg-gray-950 text-white cursor-pointer"
            >
              Account
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-20 mr-4 mt-4" align="start">
            <DropdownMenuGroup>
              <Link href="/login">
                <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">
                  <UserCheck />
                  Login
                </DropdownMenuItem>
              </Link>

              <DropdownMenuSeparator className="bg-gray-200" />

              <Link href="/register">
                <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">
                  <UserPlus /> Register
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
}
