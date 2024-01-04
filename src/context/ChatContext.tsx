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
import { FetchMessageActions } from "../utils/functions/fetchMessageReducer";

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
};

export const ChatContext = createContext<ChatContextState>({
  fetchChatsState,
  potentialChatUsersState,
  currentChat: { _id: "", members: [], createdAt: "", updatedAt: "" },
  dispatchMessages:()=>{},
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
  const {messagesState,dispatchMessages} = useFetchMessages(currentChat);
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
        dispatchMessages,
        currentChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
