import { PotentialChatUsersInitialState, PotentialUser } from "../../hooks/useFetchPotentialChatUsers"
// import { RecipientDetails as Users } from "../../hooks/useFetchRecipient"
// import { Users } from "../../hooks/useFetchPotentialChatUsers"

export type PotentialChatUsersAction =
|{
   type:"FETCH_CHATS_REQUEST"
}
|{
   type:"FETCH_CHATS_SUCCESS"
   payload:PotentialUser[]
}
|{
   type:"FETCH_CHATS_FAIL"
   payload:{message:string,isError:boolean}
}

const potentialChatUsersReducer = (state:PotentialChatUsersInitialState, action:PotentialChatUsersAction) => {
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
       potentialChatUsers: action.payload,
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

export default potentialChatUsersReducer;