import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import ChatApp from "./pages/ChatApp";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthContext } from "./context/AuthContext";
import { Chat } from "@mui/icons-material";

function App() {
  const user = useContext(AuthContext)?.postState.user;
  console.log("Luser",user)

  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/" element={user? <Chat /> : <Login />} />
        <Route path="/register" element={user ? <Chat /> : <Register />} />
        <Route path="/login" element={user ? <Chat /> : <Login />} />
        <Route path="/chat" element={<ChatApp />} />
      </Routes>
    </>
  );
}

export default App;
