import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Settings } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white w-full flex items-center justify-between border-b py-3 px-6">
      <div className="hidden md:block">Bonjour, Admin</div>
      <div className="">Equipe: #32, Encadrant: Pr. Nabil</div>
      <div className="flex items-center gap-6">
        <Settings />
        <Bell />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
