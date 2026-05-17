import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "../components/AppSidebar";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div>
          <TooltipProvider>
            <SidebarProvider>
              <aside className=" bg-orange-500">
                <AppSidebar />
              </aside>
              <main className="w-full bg-gray-800 p-3">
                <SidebarTrigger />
                {children}
              </main>
            </SidebarProvider>
          </TooltipProvider>
        </div>
      </body>
    </html>
  );
}
