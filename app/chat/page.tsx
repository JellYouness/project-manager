"use client";
import {
  CornerDownLeft,
  Info,
  MessageCirclePlus,
  Mic,
  Paperclip,
  Phone,
  Search,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { useEffect } from "react";

const chats = [
  {
    name: "John Doe",
    message: "Hey, how are you?",
    avatar: "",
    selected: true,
  },
  {
    name: "Jamal Crowford",
    message: "Hey, what's up?",
    avatar: "",
  },
  {
    name: "Kyrie Irving",
    message: "We are going to the finals!",
    avatar: "",
  },
  {
    name: "Travis Scott",
    message: "Let's go to the club tonight!",
    avatar: "",
  },
];

export default function Home() {
  useEffect(() => {
    setTimeout(() => {}, 2000);
  });
  return (
    <div className="flex gap-6 w-full h-full">
      <Card className="w-1/3 h-full">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Discussions</CardTitle>
          <MessageCirclePlus className="size-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-black" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-full bg-background pl-8"
            />
          </div>
          <div className="flex flex-col gap-2 mt-4">
            {chats.map((chat, index) => (
              <div
                className={cn(
                  "flex items-center gap-4 p-3 rounded-xl",
                  chat.selected && "bg-primary text-white",
                  !chat.selected && "hover:bg-gray-100 hover:cursor-pointer"
                )}
              >
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-sm font-medium">{chat.name}</h4>
                  <p
                    className={cn(
                      "text-xs text-muted-foreground",
                      chat.selected && "text-white"
                    )}
                  >
                    {chat.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="w-2/3 h-full">
        <CardHeader className="flex flex-row items-center justify-between py-2 border-b-2">
          <CardTitle className="text-sm font-medium">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span>John Doe</span>
            </div>
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon">
              <Phone className="size-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Info className="size-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="mt-2">
          <div className="flex flex-col gap-4 h-full">
            <div className="flex items-center gap-1 max-w-[500px] min-w-52">
              <Avatar className="size-7">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-4 p-3 rounded-xl bg-primary text-white">
                <div>
                  <p className="text-sm">Hey, how are you?</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <div className="flex items-center gap-4 max-w-[500px] min-w-52 p-3 rounded-xl bg-gray-200 text-black">
                <div>
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Necessitatibus eaque enim cum? Nulla, doloribus quod.
                    Incidunt, minus assumenda aspernatur veritatis, tempore
                    nesciunt in culpa neque sequi explicabo quaerat esse modi?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <form
            className="w-full relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
            x-chunk="dashboard-03-chunk-1"
          >
            <Label htmlFor="message" className="sr-only">
              Message
            </Label>
            <Input
              id="message"
              placeholder="Type your message here..."
              className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
            />
            <div className="flex items-center p-3 pt-0">
              <Button variant="ghost" size="icon">
                <Paperclip className="size-4" />
                <span className="sr-only">Attach file</span>
              </Button>
              <Button variant="ghost" size="icon">
                <Mic className="size-4" />
                <span className="sr-only">Use Microphone</span>
              </Button>
              <Button type="submit" size="sm" className="ml-auto gap-1.5">
                Send Message
                <CornerDownLeft className="size-3.5" />
              </Button>
            </div>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
