import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ChatApp from "./pages/ChatApp";
import Register from "./pages/Register";
import Login from "./pages/Login";

const Router=()=>{
    const BrowserRouter=createBrowserRouter(
        [
            {path:"/",element:<Login/>},
            {path:"/register",element:<Register/>},
            {path:"/chat",element:<ChatApp/>}
        ]
        
    );
    return <RouterProvider router={BrowserRouter}/>;
}
export default Router;