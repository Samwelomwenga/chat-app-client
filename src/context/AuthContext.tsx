import { createContext,ReactNode,useEffect,useReducer} from "react";
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
    user:{
        id:string;
        name:string;
        email:string;
        token:string;

    };
    error:string|null;
    loading:boolean;
}
export type UserPayload=Pick<PostUserInfoState["user"],"id"|"email"|"name"|"token">

type AuthState={
    userInfo:UserInfoState|null;
    userInfoDispatch:React.Dispatch<Action>;
    postState:PostUserInfoState;
    postDispatch:React.Dispatch<PostUserInfoAction>;
    logoutUser:()=>void;
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
        user:{
            id:"",
            name:"",
            email:"",
            token:"",
        },
        error:null,
        loading:false,
    }
    const [postState,postDispatch]=useReducer(postUserInfoReducer,postUserInfoInitialState);

    useEffect(()=>{
        const user=localStorage.getItem("user");
         user&&postDispatch?.({type:"POST_USER_INFO_SUCCESS",payload:JSON.parse(user)})
  
      },[postDispatch])
      const logoutUser=()=>{
        localStorage.removeItem("User")
        postDispatch?.({type:"POST_USER_INFO_RESET", payload:{
            id:"",
            name:"",
            email:"",
            token:"",
        }})
      }
  

    return <AuthContext.Provider value={{userInfo,userInfoDispatch,postState,postDispatch,logoutUser}}>{children}</AuthContext.Provider>
}
