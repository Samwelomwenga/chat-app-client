import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useContext } from "react";

import ChatApp from "./pages/ChatApp";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthContext } from "./context/AuthContext";
import { CssBaseline } from "@mui/material";

const Router=()=>{
  const user = useContext(AuthContext)?.postState.user;

    const BrowserRouter=createBrowserRouter(
        [
            {path:"/",element: user?.name?<ChatApp/>:<Login/>},
            {path:"/register",element:user?.name?<ChatApp/>:<Register/>},
            {path:"/login",element:user?.name?<ChatApp/>:<Login/>},
            {path:"/chat",element:<ChatApp/>}
        ]
        
    );
    return <>
    <CssBaseline/>
    <RouterProvider router={BrowserRouter}/></>;
}
export default Router;