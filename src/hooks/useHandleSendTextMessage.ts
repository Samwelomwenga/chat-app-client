import { useContext, useReducer } from "react";
import postMessageReducer from "../utils/functions/postMessageReducer";
import { baseUrl, postRequest } from "../utils/services";
import { UserPayload as User } from "../context/AuthContext";
import { Message } from "./useFetchMessages";
import { ChatContext } from "../context/ChatContext";

export type PostMessageInitialState = {
  message: Message;
  loading: boolean;
  error: { message: string; isError: boolean };
};
type PostMessage = {
  chatId: string;
  text: string;
  senderId: string;
};
const useHandleSendTextMessage = () => {
  const chatContext = useContext(ChatContext);
  const dispatchMessages = chatContext.dispatchMessages;

  const postMessageInitialState: PostMessageInitialState = {
    message: {
      _id: "",
      chatId: "",
      text: "",
      senderId: "",
      createdAt: "",
      updatedAt: "",
    },
    loading: false,
    error: { message: "", isError: false },
  };
  const [, dispatchPostMessage] = useReducer(
    postMessageReducer,
    postMessageInitialState
  );
  const handleSendTextMessage = async (
    textMessage: string,
    sender: User,
    currentChatId: string,
    setTextMessage: (text: string) => void
  ) => {
    dispatchPostMessage({ type: "POST_MESSAGE_REQUEST" });
    try {
      if (textMessage.trim().length === 0) return;
      const response = await postRequest<PostMessage, Message>(
        `${baseUrl}/messages`,
        {
          chatId: currentChatId,
          text: textMessage,
          senderId: sender.id,
        }
      );
      dispatchPostMessage({
        type: "POST_MESSAGE_SUCCESS",
        payload: response,
      });
      dispatchMessages({
        type: "ADD_MESSAGE",
        payload: response,
      });
      setTextMessage("");
    } catch (e) {
      const error = e as Error;
      console.log("error", error);
      dispatchPostMessage({
        type: "POST_MESSAGE_FAIL",
        payload: error.message,
      });
    }
  };
  return handleSendTextMessage;
};
export default useHandleSendTextMessage;
