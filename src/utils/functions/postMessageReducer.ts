import { Message } from "../../hooks/useFetchMessages";
import { PostMessageInitialState } from "../../pages/ChatApp";
type PostMessageAction =
|{
    type:"POST_MESSAGE_REQUEST"
}
|{
    type:"POST_MESSAGE_SUCCESS"
    payload:Message
}
|{
    type:"POST_MESSAGE_FAIL"
    payload:string

}

const postMessageReducer = (state:PostMessageInitialState, action: PostMessageAction) => {
    switch (action.type) {
        case "POST_MESSAGE_REQUEST": {
        return {
            ...state,
            loading: true,
            error: { message: "", isError: false },
        };
        }
        case "POST_MESSAGE_SUCCESS": {
        return {
            ...state,
            loading: false,
            error: { message: "", isError: false },
            message: action.payload,
        };
        }
        case "POST_MESSAGE_FAIL": {
        return {
            ...state,
            loading: false,
            error:{message:action.payload,isError:true},
        };
        }
       
        default:
        return state;
    }
    }
    export default postMessageReducer;