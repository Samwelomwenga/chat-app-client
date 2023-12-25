import { InitialState } from "../../context/AuthContext";
 export type Action = {
    type: string;
    payload: string;
    };
const userInfoReducer = (state: InitialState, action:Action) => {  
    switch (action.type) {
        case "USER_NAME":
        return {
            ...state,
            name: action.payload,
        };
        case "USER_EMAIL":{ 
            return {
            ...state,
            email: action.payload,
        };}
        case "USER_PASSWORD":
        {return {
            ...state,
            password: action.payload,
        };}
        default:
        return state;
    }
    }
    export default userInfoReducer;