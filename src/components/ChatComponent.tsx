"use client";
import React from "react";
import { Input } from "./ui/input";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import MessageList from "./MessageList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Message } from "ai";


type Props = { chatId: number };

const ChatComponent = ({ chatId }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const response = await axios.post<Message[]>("/api/get-messages", {
        chatId,
      });
      return response.data;
    },
  });
  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/chat",
    body: {
      chatId,
    },
    initialMessages: data || [],
  });

  React.useEffect(() => {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="overflow-hidden">
    <div className="relative max-h-screen overflow-y-scroll">
      {/* header */}
      <div className="sticky top-0 inset-x-0 p-2 bg-cyan-950 h-full w-full">
        <h3 className="text-xl font-bold text-white">Chat</h3>
      </div>

      {/* message list */}
      <MessageList messages={messages}  isLoading={isLoading} />
      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 inset-x-0 p-2 bg-white w-full"
      >
        <div className="flex">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Send a message"
            className="w-full"
          />
          <Button className="bg-cyan-500 ml-2">
            <Send className="x4 w-4" />
          </Button>
        </div>
      </form>

    </div>

      </div>
  );
};

export default ChatComponent;
