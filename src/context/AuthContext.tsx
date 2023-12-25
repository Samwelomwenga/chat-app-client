import { createContext,ReactNode,useReducer} from "react";
import userInfoReducer from "../utils/functions/userInfoReducer"
import { Action } from "../utils/functions/userInfoReducer";
type AuthContextProps={
    children:ReactNode;
}
export type InitialState={
    name:string;
    email:string;
    password:string;
}

type AuthState={
    state:InitialState|null;
    dispatch:React.Dispatch<Action>;
}

export const AuthContext=createContext<AuthState|null>(null);
export const AuthProvider=({children}:AuthContextProps)=>{
    const initialState:InitialState={
        name:"",
        email:"",
        password:"",
    }
const [ state,dispatch]=useReducer(userInfoReducer, initialState);

    return <AuthContext.Provider value={{state,dispatch}}>{children}</AuthContext.Provider>
}
