import { useEffect, useReducer } from "react";
import fetchChatsReducer from "../utils/functions/fetchChatsReducer";
import { baseUrl, getRequest } from "../utils/services";
import { UserPayload as User} from "../context/AuthContext";
import { UserChats } from "../pages/ChatApp";

export type FetchChatsInitialState = {
  loading: boolean;
  error: { message: string; isError: boolean } | null;
  userChats: UserChats;
};

export const fetchChatsInitialState: FetchChatsInitialState = {
  loading: true,
  error: null,
  userChats:{chats:[]},
};
const useFetch = (user:User) => {
  const [fetchChatsState, dispatchFetchChats] = useReducer(
    fetchChatsReducer,
    fetchChatsInitialState
  );
 
  useEffect(() => {
    let ignore = false;
    const fetchChats = async () => {
        if (user.id) {
            dispatchFetchChats({ type: "FETCH_CHATS_REQUEST" });
            try {
              const userChats = await getRequest(`${baseUrl}/chats/${user.id}`);
              if (!ignore) {
                dispatchFetchChats({
                  type: "FETCH_CHATS_SUCCESS",
                  payload: userChats,
                });
              }
            } catch (e) {
              const error = e as Error;
      
              if (!ignore) {
                dispatchFetchChats({
                  type: "FETCH_CHATS_FAIL",
                  payload: { message: error.message, isError: true },
                });
              }
            }
        }
    
    };
    fetchChats();
    return () => {
      ignore = true;
    };
  }, [user.id]);
  return fetchChatsState;
};

export default useFetch;
