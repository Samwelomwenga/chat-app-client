import { createContext,ReactNode } from "react";
import { UserPayload as User } from "./AuthContext";
import useFetch, { fetchChatsInitialState, FetchChatsInitialState } from "../hooks/useFetch";

type ChatContextProps = {
    children: ReactNode;
    user:User;
    };

export const ChatContext = createContext<FetchChatsInitialState>(fetchChatsInitialState);

export const ChatContextProvider = ({ children,user}:ChatContextProps) => {
    const fetchChatsState=useFetch(user)
  return <ChatContext.Provider value={fetchChatsState}>{children}</ChatContext.Provider>;
};