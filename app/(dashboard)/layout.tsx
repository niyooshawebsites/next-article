import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "../components/AppSidebar";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

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
              <div className=" bg-gray-50">
                <AppSidebar />
              </div>
              <main className="w-full p-3">
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
