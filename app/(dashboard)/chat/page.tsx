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
import { useEffect, useRef, useState } from "react";
import { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "@/api/supabaseClient";
import {
  fetchChats,
  fetchMessages,
  sendMessage,
} from "@/api/fetchers/chatServices";
import { stringToAvatar } from "@/utils/stringAvatar";

export default function Home() {
  const [messages, setMessages] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [chats, setChats] = useState<any[]>([]);
  const [senderId, setSenderId] = useState<number | null>(null);
  const [recipientId, setRecipientId] = useState<number | null>(null);

  useEffect(() => {}, []);

  //fetch chats for the user
  useEffect(() => {
    setSenderId(
      JSON.parse(window.localStorage.getItem("user") as string).supabase
    );
    const fetchInitialChats = async () => {
      const fetchedChats = await fetchChats(
        JSON.parse(window.localStorage.getItem("user") as string).supabase
      );
      if (fetchedChats) {
        setChats(fetchedChats);
      }
    };

    fetchInitialChats();
  }, [senderId]);

  useEffect(() => {
    const fetchInitialMessages = async () => {
      //@ts-ignore
      const fetchedMessages = await fetchMessages(2, recipientId);
      if (fetchedMessages) {
        setMessages(fetchedMessages);
      }
    };

    fetchInitialMessages();

    const channel = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          setMessages((prevMessages) => [...prevMessages, payload.new]);
        }
      )
      .subscribe();
    console.log("messages : ", messages);

    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [senderId, recipientId]);

  const [messageContent, setMessageContent] = useState<string>("");
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (messageContent.trim() === "") return;
    //@ts-ignore
    const newMessage = await sendMessage(senderId, recipientId, messageContent);
    if (newMessage) {
      setMessages((prevMessages) => [...prevMessages, newMessage[0]]);
      setMessageContent("");
      //@ts-ignore
      if (inputRef && inputRef.current) inputRef.current.value = null;
    }
  };

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
            {chats?.map((chat, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 p-3 rounded-xl ${
                  chat.recipient_id === recipientId
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-black"
                }`}
                onClick={() =>
                  setRecipientId(
                    senderId === chat.from.id ? chat.to?.id : chat.from?.id
                  )
                }
              >
                <Avatar>
                  <AvatarFallback
                    {...stringToAvatar(
                      senderId === chat.from?.id
                        ? chat.to?.name
                        : chat.from?.name
                    )}
                  />
                </Avatar>
                <div>
                  <h4 className="text-sm font-medium">
                    {senderId === chat.from?.id
                      ? chat.to?.name
                      : chat.from?.name}
                  </h4>
                  <p
                    className={cn(
                      "text-xs text-muted-foreground text-gray-500",
                      chat.recipient_id === recipientId
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-black"
                    )}
                  >
                    {chat.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="w-2/3 h-full flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between py-2 border-b-2">
          <CardTitle className="text-sm font-medium">
            <div className="flex items-center gap-4">
              <span>CHAT</span>
            </div>
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon">
              <Info className="size-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto p-4">
          <div className="flex flex-col gap-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender_id === senderId
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`flex items-center gap-2 p-3 rounded-xl ${
                    message.sender_id === senderId
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {message.sender_id !== senderId && (
                    <Avatar className="size-7">
                      <AvatarFallback
                        {...stringToAvatar(
                          senderId === message.from?.id
                            ? message.to?.name
                            : message.from?.name
                        )}
                      />
                    </Avatar>
                  )}

                  <div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <form
            className="w-full relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
            onSubmit={handleSendMessage}
          >
            <Label htmlFor="message" className="sr-only">
              Message
            </Label>
            <Input
              ref={inputRef}
              id="message"
              placeholder="Type your message here..."
              className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
            />
            <div className="flex items-center p-3 pt-0">
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
