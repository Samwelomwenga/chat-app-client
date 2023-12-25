import { PostUserInfoState } from "../../context/AuthContext";

export type PostUserInfoAction = {
    type: string;
    payload: string;
    };

const postUserInfoReducer = (state: PostUserInfoState, action: PostUserInfoAction):PostUserInfoState => {
    switch (action.type) {
        case "POST_USER_INFO_REQUEST":{
            return {
                ...state,
                loading: true,
                error: null,
            }
        }
        case "POST_USER_INFO_SUCCESS":{
            return {
                ...state,
                loading: false,
                error: null,
                user: action.payload,
            }
        }
        case "POST_USER_INFO_FAIL":{
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        } 
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}
export default postUserInfoReducer;