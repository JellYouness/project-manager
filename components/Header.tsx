"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Settings } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { authSlice, dispatch, store } from "@/api/baseApi";

const Header = () => {
  const user = localStorage.getItem("user")
    ? localStorage.getItem("user")
    : { username: "Not connected" };

  const handleLogout = () => {
    // handle logout
    dispatch(authSlice.actions.setToken(null));
    dispatch(authSlice.actions.setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
  return (
    <header className="bg-white w-full flex items-center justify-between border-b py-3 px-6">
      <div className="hidden md:block">Bonjour, Admin</div>
      <Badge className="text-sm" variant="secondary">
        Groupe: #32 | Encadrant: Pr. Nabil
      </Badge>
      <div className="flex items-center gap-6">
        <Link href="/settings/profile">
          <Settings />
        </Link>
        <Bell />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Badge variant="default">{user?.username}</Badge>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <Button variant="ghost" onClick={handleLogout}>
                Déconnecter
              </Button>
            </DropdownMenuLabel>
            {/* <DropdownMenuSeparator /> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
