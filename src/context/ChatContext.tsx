import { createContext,ReactNode } from "react";
import { UserPayload as User } from "./AuthContext";
import useFetch, { fetchChatsInitialState as fetchChatsState, FetchChatsInitialState } from "../hooks/useFetch";
import useFetchPotentialChatUsers, { PotentialChatUsersInitialState ,potentialChatUsersInitialState as potentialChatUsersState} from "../hooks/useFetchPotentialChatUsers";

type ChatContextProps = {
    children: ReactNode;
    user:User;
    };
type ChatContextState = {
    fetchChatsState:FetchChatsInitialState;
    potentialChatUsersState:PotentialChatUsersInitialState;
    };

export const ChatContext = createContext<ChatContextState>({fetchChatsState,potentialChatUsersState});

export const ChatContextProvider = ({ children,user}:ChatContextProps) => {
    const fetchChatsState=useFetch(user)
const potentialChatUsersState=useFetchPotentialChatUsers(fetchChatsState.userChats,user);
  return <ChatContext.Provider value={{fetchChatsState,potentialChatUsersState}}>{children}</ChatContext.Provider>;
};