"use client";
import React, { useEffect, useState } from "react";
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
import { Button, buttonVariants } from "./ui/button";
import { Badge } from "./ui/badge";
import { authSlice, dispatch, store } from "@/api/baseApi";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const pathName = usePathname();
  useEffect(() => {
    setUser(
      window.localStorage.getItem("user")
        ? JSON.parse(window.localStorage.getItem("user") as string)
        : { username: "Not connected" }
    );
  }, []);

  const handleLogout = () => {
    // handle logout
    dispatch(authSlice.actions.setToken(null));
    dispatch(authSlice.actions.setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // redirect to login page
    router.push("/login");
  };
  return (
    <header className="bg-white w-full flex items-center justify-between border-b py-3 px-6">
      <Badge className="text-sm" variant="default">
        Groupe: #32 | Sujet: PFE
      </Badge>
      <div className="flex items-center gap-6">
        <Link
          className={buttonVariants({
            variant: "/settings" === pathName ? "default" : "ghost",
            size: "icon",
          })}
          href="/settings"
        >
          <Settings />
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex flex-col items-center p-1 pb-2 rounded-lg hover:bg-gray-200">
            <Avatar>
              <AvatarImage src="/userlogo.jpg" />
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
