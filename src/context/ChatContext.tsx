import { createContext, ReactNode, useEffect, useState } from "react";
import { UserPayload as User } from "./AuthContext";
import useFetch, {
  fetchChatsInitialState as fetchChatsState,
  FetchChatsInitialState,
} from "../hooks/useFetch";
import useFetchPotentialChatUsers, {
  PotentialChatUsersInitialState,
  potentialChatUsersInitialState as potentialChatUsersState,
} from "../hooks/useFetchPotentialChatUsers";
import { Chat } from "../pages/ChatApp";
import useFetchMessages, {
  Message,
  MessageInitialState,
} from "../hooks/useFetchMessages";
import { FetchMessageActions } from "../utils/functions/fetchMessageReducer";

import io, { Socket } from "socket.io-client";

type ChatContextProps = {
  children: ReactNode;
  user: User;
};
type ChatContextState = {
  fetchChatsState: FetchChatsInitialState;
  potentialChatUsersState: PotentialChatUsersInitialState;
  messagesState: MessageInitialState;
  dispatchMessages: React.Dispatch<FetchMessageActions>;
  updateCurrentChat: (chat: Chat) => void;
  currentChat: Chat;
  onlineUsers: OnlineUser[];
  setMessageSend:()=>void
};

export const ChatContext = createContext<ChatContextState>({
  fetchChatsState,
  potentialChatUsersState,
  setMessageSend:()=>{},
  currentChat: { _id: "", members: [], createdAt: "", updatedAt: "" },
  dispatchMessages: () => {},
  messagesState: {
    messages: { messages: [] },
    message: {
      _id: "",
      chatId: "",
      senderId: "",
      text: "",
      createdAt: "",
      updatedAt: "",
    },

    loading: false,
    error: { message: "", isError: false },
  },
  updateCurrentChat: () => {},
  onlineUsers: [],
});
type OnlineUser = {
  userId: string;
  socketId: string;
};

export const ChatContextProvider = ({ children, user }: ChatContextProps) => {
  const [currentChat, setCurrentChat] = useState<Chat>({
    _id: "",
    members: [],
    createdAt: "",
    updatedAt: "",
  });
  const updateCurrentChat = (chat: Chat) => {
    setCurrentChat(chat);
  };
  const { messagesState, dispatchMessages } = useFetchMessages(currentChat);
  const { message } = messagesState;
  const fetchChatsState = useFetch(user);
  const potentialChatUsersState = useFetchPotentialChatUsers(
    fetchChatsState.userChats,
    user
  );
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [isMessageSent, setIsMessageSent] = useState(false);
  const setMessageSend = () => {
    setIsMessageSent(true);
  }
  console.log("isMessageSent",isMessageSent)

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);
    newSocket.on("connect", () => {
      console.log("connected to socket", newSocket.id);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [user]);
  useEffect(() => {
    if (socket) {
      socket.emit("join", user.id);
      socket.on("getOnlineUsers", (onlineUsers: OnlineUser[]) => {
        setOnlineUsers(onlineUsers);
      });
    }
    return () => {
      if (socket) {
        socket.off("getOnlineUsers");
      }
    };
  }, [user.id, socket]);

  useEffect(() => {
    if (socket&&isMessageSent) {
      const recipientId = currentChat.members.find(
        (id: string) => id !== user.id
      );
      console.log("message", message,"\n","socketId",socket.id,"\n","currentChatId",currentChat._id,"\n","userId",user.id,);
      socket.emit("sendMessage", { message, recipientId });
      setIsMessageSent(false);
    }
  }, [message, socket, currentChat, user.id,isMessageSent]);

  useEffect(() => {
    if (socket) {
      const handleGetMessage = (message: Message) => {
        if ( message.chatId !== currentChat._id) return;
        dispatchMessages({ type: "ADD_MESSAGE", payload: message });
      };
   
      socket.on("getMessage", handleGetMessage);
   
      return () => {
        socket.off("getMessage", handleGetMessage);
      };
    }
   }, [socket, dispatchMessages, currentChat._id]);

  return (
    <ChatContext.Provider
      value={{
        fetchChatsState,
        potentialChatUsersState,
        updateCurrentChat,
        messagesState,
        dispatchMessages,
        currentChat,
        onlineUsers,
        setMessageSend
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
