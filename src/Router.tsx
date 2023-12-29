import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useContext } from "react";

import ChatApp from "./pages/ChatApp";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthContext } from "./context/AuthContext";
import { CssBaseline } from "@mui/material";
import { ChatContextProvider } from "./context/ChatContext";

const Router=()=>{
    const defaultUser = { id: '', name: '', email: '', token: '' }; 

  const user = useContext(AuthContext)?.postState.user || defaultUser;

    const BrowserRouter=createBrowserRouter(
        [
            {path:"/",element: user?.name?<ChatApp/>:<Login/>},
            {path:"/register",element:user?.name?<ChatApp/>:<Register/>},
            {path:"/login",element:user?.name?<ChatApp/>:<Login/>},
            {path:"/chat",element:<ChatApp/>}
        ]
        
    );
    return <>
    <ChatContextProvider user={user&&user}>
    <CssBaseline/>
    <RouterProvider router={BrowserRouter}/>
    </ChatContextProvider>
    </>;
}
export default Router;