import { useEffect, useReducer } from "react";
import fetchMessageReducer from "../utils/functions/fetchMessageReducer";
import { Chat } from "../pages/ChatApp";
import { baseUrl, getRequest } from "../utils/services";

export type Message = {
  _id: string;
  chatId: string;
  senderId: string;
  text: string;
  createdAt: string;
  updatedAt: string;
};

export type MessageInitialState = {
  messages:Message [];
  loading: boolean;
  error: { message: string; isError: boolean };
};
const useFetchMessages = (currentChat: Chat) => {
  const messagesInitialState: MessageInitialState = {
    messages: [],
    loading: false,
    error: { message: "", isError: false },
  };

  const [messagesState, dispatchMessages] = useReducer(
    fetchMessageReducer,
    messagesInitialState
  );
  useEffect(() => {
    let ignore = false;
    const getMessages = async () => {
      dispatchMessages({ type: "FETCH_MESSAGE_REQUEST" });
      try {
        const messages = await getRequest(
          `${baseUrl}/messages/${currentChat._id}`
        );
        console.log("messages", messages)
        if (!ignore) {
          dispatchMessages({
            type: "FETCH_MESSAGE_SUCCESS",
            payload: messages,
          });
        }
      } catch (e) {
        const error = e as Error;
        if (!ignore) {
          dispatchMessages({
            type: "FETCH_MESSAGE_FAIL",
            payload: { message: error.message, isError: true },
          });
        }
      }
    };
    getMessages();
    return () => {
      ignore = true;
    };
  }, [currentChat._id]);
    return messagesState;
};
export default useFetchMessages;
