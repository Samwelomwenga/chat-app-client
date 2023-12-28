import { registerInfoState } from "../../context/AuthContext";
 export type Action = {
    type: string;
    payload: string;
    };
export const registerUserReducer = (state: registerInfoState, action:Action) => {  
    switch (action.type) {
        case "SET_NAME":
        return {
            ...state,
            name: action.payload,
        };
        case "SET_EMAIL":{ 
            return {
            ...state,
            email: action.payload,
        };}
        case "SET_PASSWORD":
        {return {
            ...state,
            password: action.payload,
        };}
        default:
        return state;
    }
    }