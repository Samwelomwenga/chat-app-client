import { createContext, ReactNode, useEffect, useReducer } from "react";
import {
  loginUserReducer,
  registerUserReducer,
} from "../utils/functions/userInfoReducer";
import { Action } from "../utils/functions/userInfoReducer";
import postUserInfoReducer, {
  PostUserInfoAction,
} from "../utils/functions/postUserInfoReducer";
type AuthContextProps = {
  children: ReactNode;
};
export type RegisterInfoState = {
  name: string;
  email: string;
  password: string;
};
export type LoginInfoState = Omit<RegisterInfoState, "name">;
export type PostUserInfoState = {
  user: {
    id: string;
    name: string;
    email: string;
    token: string;
  };
  error: {
    isError: boolean;
    message: string;
  } | null;
  loading: boolean;
};
export type UserPayload = Pick<
  PostUserInfoState["user"],
  "id" | "email" | "name" | "token"
>;

type AuthState = {
  userInfo: RegisterInfoState | null;
  userInfoDispatch: React.Dispatch<Action>;
  postState: PostUserInfoState;
  postDispatch: React.Dispatch<PostUserInfoAction>;
  loginInfo: LoginInfoState;
  loginInfoDispatch: React.Dispatch<Action>;
};

export const AuthContext = createContext<AuthState | null>(null);
export const AuthProvider = ({ children }: AuthContextProps) => {
  const registerInfoInitialState: RegisterInfoState = {
    name: "",
    email: "",
    password: "",
  };
  const [userInfo, userInfoDispatch] = useReducer(
    registerUserReducer,
    registerInfoInitialState
  );

  const postUserInfoInitialState: PostUserInfoState = {
    user: {
      id: "",
      name: "",
      email: "",
      token: "",
    },
    error: null,
    loading: false,
  };
  const [postState, postDispatch] = useReducer(
    postUserInfoReducer,
    postUserInfoInitialState
  );
  const loginInfoInitialState: LoginInfoState = {
    email: "",
    password: "",
  };
  const [loginInfo, loginInfoDispatch] = useReducer(
    loginUserReducer,
    loginInfoInitialState
  );

  useEffect(() => {
    const user = localStorage.getItem("user");
    user &&
      postDispatch?.({
        type: "POST_USER_INFO_SUCCESS",
        payload: JSON.parse(user),
      });
  }, [postDispatch]);

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        userInfoDispatch,
        postState,
        postDispatch,
        loginInfo,
        loginInfoDispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
