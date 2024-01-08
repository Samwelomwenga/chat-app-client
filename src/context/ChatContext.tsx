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
};

export const ChatContext = createContext<ChatContextState>({
  fetchChatsState,
  potentialChatUsersState,
  currentChat: { _id: "", members: [], createdAt: "", updatedAt: "" },
  dispatchMessages: () => {},
  messagesState: {
    messages: { messages: [] },
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
  const fetchChatsState = useFetch(user);
  const potentialChatUsersState = useFetchPotentialChatUsers(
    fetchChatsState.userChats,
    user
  );
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  console.log("onlineUsers", onlineUsers);

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
  }, [user.id, socket]);
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
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
