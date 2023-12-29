import { FetchChatsInitialState } from "../../hooks/useFetch";

 export type FetchChatsAction =
|{
    type:"FETCH_CHATS_REQUEST"
}
|{
    type:"FETCH_CHATS_SUCCESS"
    payload:string[]
}
|{
    type:"FETCH_CHATS_FAIL"
    payload:{message:string,isError:boolean}
}

const fetchChatsReducer = (state:FetchChatsInitialState, action:FetchChatsAction) => {
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
   
    default:
      return state;
  }
}
export default fetchChatsReducer;