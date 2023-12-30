import { useEffect, useReducer } from "react";
import fetchRecipientReducer from "../utils/functions/fetchRecepientReducer";
import { baseUrl, getRequest } from "../utils/services";
import { UserPayload as User } from "../context/AuthContext";
type Chat = {
  _id: string;
  members: string[];
  createdAt: string;
  updatedAt: string;
};

export type RecipientDetails = {
  _id: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};
export type RecipientInitialState = {
  recipient: RecipientDetails| null;
  loading: boolean;
  error: { message: string; isError: boolean } | null;
};

const useFetchRecipient = (chat: Chat, user: User) => {
  const recipientInitialState: RecipientInitialState = {
    recipient: null,
    loading: false,
    error: null,
  };
  const [recipientState, dispatchRecipient] = useReducer(
    fetchRecipientReducer,
    recipientInitialState
  );
  const recipientId = chat.members.find((id: string) => id !== user.id);
  useEffect(() => {
    let ignore = false;
    const fetchRecipient = async () => {
      if (!recipientId) return;
      dispatchRecipient({ type: "FETCH_RECIPIENT_REQUEST" });
      try {
        const recipient = await getRequest(
          `${baseUrl}/users/find/${recipientId}`
        );
        if (!ignore) {
          dispatchRecipient({
            type: "FETCH_RECIPIENT_SUCCESS",
            payload: recipient,
          });
        }
      } catch (e) {
        const error = e as Error;
        if (!ignore) {
          dispatchRecipient({
            type: "FETCH_RECIPIENT_FAIL",
            payload: { message: error.message, isError: true },
          });
        }
      }
    };
    fetchRecipient();
    return () => {
      ignore = true;
    };
  }, [recipientId]);
  return recipientState;
};
export default useFetchRecipient;
