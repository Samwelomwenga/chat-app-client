import {Route,Routes} from "react-router-dom"
import { CssBaseline } from "@mui/material";
import ChatApp from "./pages/ChatApp";
import Register from "./pages/Register";
import Login from "./pages/Login"


function App() {
  return (
   <>
   <CssBaseline/>
   <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/chat" element={<ChatApp/>}/>
   </Routes>
   
   {/* <Register/> */}
   {/* <Login/> */}
   {/* <ChatApp/> */}
   </>
  );
}

export default App;
