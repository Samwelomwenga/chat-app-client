import { MessageInitialState } from "../../hooks/useFetchMessages"
import { Message } from "../../hooks/useFetchMessages"
export type FetchMessageActions={
    type:"FETCH_MESSAGE_REQUEST"
}
|{
    type:"FETCH_MESSAGE_SUCCESS"
    payload:{messages:Message[]}
}
|{
    type:"FETCH_MESSAGE_FAIL"
    payload:{message:string,isError:boolean}
}
|{type:"ADD_MESSAGE",payload:Message}


const fetchMessageReducer=(state:MessageInitialState,action:FetchMessageActions)=>{
    switch(action.type){
        case 'FETCH_MESSAGE_REQUEST':
            return{
                ...state,
                loading:true,
                error:{message:"",isError:false}
            }
        case 'FETCH_MESSAGE_SUCCESS':
            return{
                ...state,
                loading:false,
                error:{message:"",isError:false},
                messages:action.payload
            }
        case 'FETCH_MESSAGE_FAIL':
            return{
                ...state,
                loading:false,
                error:{message:action.payload.message,isError:true}
            }
        case 'ADD_MESSAGE':
            return{
                ...state,
                messages:{messages:[...state.messages.messages,action.payload]}
            }
        default:
            return state
    }

}
export default fetchMessageReducer;