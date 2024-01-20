import { useContext, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { SendRounded } from "@mui/icons-material";
import { AuthContext } from "../context/AuthContext";
import stringAvatar from "../utils/functions/stringAvatar";
import { ChatContext } from "../context/ChatContext";
import PotentialChats from "../components/PotentialChats";
import ChatBox from "../components/ChatBox";
import useHandleSendTextMessage from "../hooks/useHandleSendTextMessage";
import Chats from "../components/Chats";
import { useNavigate } from "react-router-dom";

export type Chat = {
  _id: string;
  members: string[];
  createdAt: string;
  updatedAt: string;
};
type Chats = Chat[];

export type UserChats = {
  chats: Chats;
};

function ChatApp() {
  const navigate=useNavigate()
  const authContext = useContext(AuthContext);
  const user = authContext?.postState.user || {
    id: "",
    name: "",
    email: "",
    token: "",
  };
  const postDispatch = authContext?.postDispatch;
  const chatContext = useContext(ChatContext);
  const currentChat = chatContext.currentChat;

  const [textMessage, setTextMessage] = useState("");
  const resetTextMessage = () => setTextMessage("");
  const handleSendTextMessage = useHandleSendTextMessage();

  const logoutUser=()=>{
    localStorage.removeItem("user")
    postDispatch?.({type:"POST_USER_INFO_RESET"})
    navigate("/login")
  }

  return (
    <Box sx={{ height: "100vh", position: "relative" }}>
      <Box
        sx={{
          bgcolor: "primary.dark",
          p: "1.5rem",
          mb: { xs: "1.5rem", md: "0" },
          px: {
            md: "7.5rem",
          },
          width: "100%",
          display: "flex",
          gap: "5rem",
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <Avatar {...stringAvatar(user?.name || "Anonymous User")} />
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: "semi-bold",
              fontSize: "1.5rem",
            }}
          >
            {user?.name}
          </Typography>
        </Box>
        <Button
          onClick={() => logoutUser()}
          variant="text"
          sx={{
            ml: "auto",
            color: "black",
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          Log out
        </Button>
      </Box>
      <Box sx={{ display: { md: "grid" }, gridTemplateColumns: "1fr 3fr" }}>
        <Chats />
        <Box>
          <ChatBox />

          <PotentialChats />

          <TextField
            value={textMessage}
            sx={{
              position: "fixed",
              bottom: ".2rem",
              backgroundColor: "lightgrey",
              width: {
                xs: "100%",
                md: "90rem",
              },
            }}
            placeholder="Type Message..."
            onChange={(e) => setTextMessage(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Box sx={{ "& :hover": { cursor: "pointer" },pr:{md:"1rem"}}}>
                    <SendRounded
                      color="primary"
                      fontSize="large"
                      onClick={() =>
                        handleSendTextMessage(
                          textMessage,
                          user,
                          currentChat._id,
                          resetTextMessage
                        )
                      }
                    />
                  </Box>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ChatApp;
