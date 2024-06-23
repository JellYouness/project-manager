import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import SideBar from "@/components/SideBar";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import ReduxProvider from "../ReduxProvider";
import AuthProvider from "./AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className={inter.className}>
      <AuthProvider>
        <SideBar />
        <div className="flex h-full w-full flex-1 flex-col">
          <Header />
          <div className="p-4 h-full overflow-y-scroll">{children}</div>
        </div>
      </AuthProvider>
    </body>
  );
}