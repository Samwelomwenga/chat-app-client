import { createContext, ReactNode, useState } from "react";
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

type ChatContextProps = {
  children: ReactNode;
  user: User;
};
type ChatContextState = {
  fetchChatsState: FetchChatsInitialState;
  potentialChatUsersState: PotentialChatUsersInitialState;
  messagesState: MessageInitialState;
  updateCurrentChat: (chat: Chat) => void;
};

export const ChatContext = createContext<ChatContextState>({
  fetchChatsState,
  potentialChatUsersState,
  messagesState:{
    messages:{messages:[]},
    loading:false,
    error:{message:"",isError:false}

  },
  updateCurrentChat: () => {},
});

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
  const messagesState = useFetchMessages(currentChat);
  const fetchChatsState = useFetch(user);
  const potentialChatUsersState = useFetchPotentialChatUsers(
    fetchChatsState.userChats,
    user
  );

  return (
    <ChatContext.Provider
      value={{
        fetchChatsState,
        potentialChatUsersState,
        updateCurrentChat,
        messagesState,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
