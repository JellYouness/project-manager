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

const Header = () => {
  return (
    <header className="bg-white w-full flex items-center justify-between border-b py-3 px-6">
      <div className="hidden md:block">Bonjour, Admin</div>
      <div className="">Equipe: #32, Encadrant: Pr. Nabil</div>
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
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <Button variant="ghost">Déconnecter</Button>
            </DropdownMenuLabel>
            {/* <DropdownMenuSeparator /> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
