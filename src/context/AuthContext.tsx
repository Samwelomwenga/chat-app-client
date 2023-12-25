import { createContext,ReactNode,useReducer} from "react";
import userInfoReducer from "../utils/functions/userInfoReducer"
import { Action } from "../utils/functions/userInfoReducer";
import postUserInfoReducer, { PostUserInfoAction } from "../utils/functions/postUserInfoReducer";
type AuthContextProps={
    children:ReactNode;
}
export type UserInfoState={
    name:string;
    email:string;
    password:string;
}
export type PostUserInfoState={
    user:string;
    error:string|null;
    loading:boolean;
}

type AuthState={
    userInfo:UserInfoState|null;
    userInfoDispatch:React.Dispatch<Action>;
    postState:PostUserInfoState;
    postDispatch:React.Dispatch<PostUserInfoAction>;
}

export const AuthContext=createContext<AuthState|null>(null);
export const AuthProvider=({children}:AuthContextProps)=>{
    const userInfoInitialState:UserInfoState={
        name:"",
        email:"",
        password:"",
    }
    const [ userInfo,userInfoDispatch]=useReducer(userInfoReducer, userInfoInitialState);
    const postUserInfoInitialState:PostUserInfoState={
        user:"",
        error:null,
        loading:false,
    }
    const [postState,postDispatch]=useReducer(postUserInfoReducer,postUserInfoInitialState);

    return <AuthContext.Provider value={{userInfo,userInfoDispatch,postState,postDispatch}}>{children}</AuthContext.Provider>
}
