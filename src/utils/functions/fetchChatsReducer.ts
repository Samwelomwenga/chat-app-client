import { NewSavedChat } from "../../components/PotentialChat";
import { FetchChatsInitialState } from "../../hooks/useFetch";
import { UserChats } from "../../pages/ChatApp";

export type FetchChatsAction =
  | {
      type: "FETCH_CHATS_REQUEST";
    }
  | {
      type: "FETCH_CHATS_SUCCESS";
      payload: UserChats;
    }
  | {
      type: "FETCH_CHATS_FAIL";
      payload: { message: string; isError: boolean };
    }
  | { type: "FETCH_SAVED_CHAT"; payload: NewSavedChat };

const fetchChatsReducer = (
  state: FetchChatsInitialState,
  action: FetchChatsAction
) => {
  switch (action.type) {
    case "FETCH_CHATS_REQUEST": {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case "FETCH_CHATS_SUCCESS": {
      return {
        ...state,
        loading: false,
        error: null,
        userChats: action.payload,
      };
    }
    case "FETCH_CHATS_FAIL": {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case "FETCH_SAVED_CHAT": {
      return {
        ...state,
        loading: false,
        error: null,
        userChats:{...state.userChats,
        chats: [...state.userChats.chats, action.payload],}
      };
    }

    default:
      return state;
  }
};
export default fetchChatsReducer;
