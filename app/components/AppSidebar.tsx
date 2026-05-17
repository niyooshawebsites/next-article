import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Home,
  Users,
  UserPlus,
  UserPen,
  KeySquare,
  Newspaper,
  SquareLibrary,
  LogOut,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { logOutUser } from "../actions/auth-actions";
import { auth } from "@/lib/auth";

const postItems = [
  {
    title: "All Posts",
    icon: SquareLibrary,
    link: "/posts",
  },
  {
    title: "Create Post",
    icon: Newspaper,
    link: "/post/create",
  },
];

const userItems = [
  {
    title: "All Users",
    icon: Users,
    link: "/users",
  },
  {
    title: "Create User",
    icon: UserPlus,
    link: "/user/create",
  },
];

const settingItems = [
  {
    title: "Profile",
    icon: UserPen,
    link: "/profile/edit",
  },
  {
    title: "Password",
    icon: KeySquare,
    link: "/password/edit",
  },
];

export default async function AppSidebar() {
  const session = await auth();

  return (
    <Sidebar collapsible="icon">
      {/* HEADER */}
      <SidebarHeader className="border-b">
        <Link href="/">
          <div className="flex items-center gap-2 px-2 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-500 text-white">
              <Home size={18} />
            </div>

            <div className="flex flex-col">
              <span className="font-semibold">Acme Inc</span>
              <span className="text-xs text-muted-foreground">Enterprise</span>
            </div>
          </div>
        </Link>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent>
        {/* POSTS */}
        <SidebarGroup>
          <SidebarGroupLabel>Posts</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <Collapsible defaultOpen>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <SquareLibrary className="h-4 w-4" />
                      <span>Posts</span>

                      <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="mt-1 space-y-1">
                    {postItems.map((item) => (
                      <SidebarMenuButton
                        asChild
                        key={item.title}
                        className="pl-8"
                      >
                        <Link
                          href={item.link}
                          className="flex items-center gap-2"
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    ))}
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* USERS */}
        <SidebarGroup>
          <SidebarGroupLabel>Users</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <Collapsible>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <Users className="h-4 w-4" />
                      <span>Users</span>

                      <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="mt-1 space-y-1">
                    {userItems.map((item) => (
                      <SidebarMenuButton
                        asChild
                        key={item.title}
                        className="pl-8"
                      >
                        <Link
                          href={item.link}
                          className="flex items-center gap-2"
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    ))}
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* SETTINGS */}
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <Collapsible>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <UserPen className="h-4 w-4" />
                      <span>Settings</span>

                      <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="mt-1 space-y-1">
                    {settingItems.map((item) => (
                      <SidebarMenuButton
                        asChild
                        key={item.title}
                        className="pl-8"
                      >
                        <Link
                          href={item.link}
                          className="flex items-center gap-2"
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    ))}
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="border-t p-2">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {session?.user?.name || "Ghost"}
          </div>

          <form action={logOutUser}>
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              className="cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
