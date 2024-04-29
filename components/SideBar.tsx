"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Calendar,
  ChevronRight,
  File,
  Home,
  LayoutDashboard,
  MessageCircle,
  UsersRound,
} from "lucide-react";
import Nav from "./Nav";
import Logo from "@/public/logo.svg";
import Image from "next/image";

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onlyWidth = window.innerWidth;
  const mobileWidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }
  return (
    <div className="bg-[#333238] text-white relative min-w-14 lg:min-w-20 h-screen border-r px-3 pb-10 pt-8">
      {!mobileWidth && (
        <div className="absolute right-[-20px] top-7">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className="rounded-full p-2"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
      <div className="flex items-center justify-center gap-2 pb-4">
        <Image className="w-10 flex-none" src={Logo} alt="" />
        {/* {!isCollapsed && !mobileWidth && (
          <h1 className="text-xl font-bold">Manager</h1>
        )} */}
      </div>
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Home",
            href: "/",
            icon: Home,
            variant: "ghost",
          },
          {
            title: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title: "Calendar",
            href: "/calendar",
            icon: Calendar,
            variant: "default",
          },
          {
            title: "Documents",
            href: "/documents",
            icon: File,
            variant: "default",
          },
          {
            title: "Chat",
            href: "/chat",
            icon: MessageCircle,
            variant: "default",
          },
        ]}
      />
    </div>
  );
};

export default SideBar;
