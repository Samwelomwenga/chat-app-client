import { useContext, useReducer, useState } from "react";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { SendRounded, BorderColorRounded } from "@mui/icons-material";
import { AuthContext } from "../context/AuthContext";
import stringAvatar from "../utils/functions/stringAvatar";
import { ChatContext } from "../context/ChatContext";
import UserChat from "../components/UserChat";
import { UserPayload as User } from "../context/AuthContext";
import PotentialChats from "../components/PotentialChats";
import ChatBox from "../components/ChatBox";
import { Message } from "../hooks/useFetchMessages";
import postMessageReducer from "../utils/functions/postMessageReducer";
import { baseUrl, postRequest } from "../utils/services";

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

export type PostMessageInitialState = {
  message: Message;
  loading: boolean;
  error: { message: string; isError: boolean };
};

function ChatApp() {
  const authContext = useContext(AuthContext);
  const user = authContext?.postState.user || {
    id: "",
    name: "",
    email: "",
    token: "",
  };
  const logoutUser = authContext?.logoutUser;
  const chatContext = useContext(ChatContext);
  const userChats = chatContext.fetchChatsState.userChats;
  const updateCurrentChat = chatContext.updateCurrentChat;
  const currentChat = chatContext.currentChat;
  const dispatchMessages = chatContext.dispatchMessages;
  
  const [textMessage, setTextMessage] = useState("");

  const postMessageInitialState = {
    message: {
      _id: "",
      chatId: "",
      text: "",
      senderId: "",
      createdAt: "",
      updatedAt: "",
    },
    loading: false,
    error: { message: "", isError: false },
  };
  const [, dispatchPostMessage] = useReducer(
    postMessageReducer,
    postMessageInitialState
  );

  const handleSendTextMessage = async (
    textMessage: string,
    sender: User,
    currentChatId: string,
    setTextMessage: (text: string) => void
  ) => {
    dispatchPostMessage({ type: "POST_MESSAGE_REQUEST" });
    try {
      if (textMessage.trim().length === 0) return;
      const response:Message = await postRequest(`${baseUrl}/messages`, {
        chatId: currentChatId,
        text: textMessage,
        senderId: sender.id,
      });
      dispatchPostMessage({
        type: "POST_MESSAGE_SUCCESS",
        payload: response,
      });
      dispatchMessages({
        type: "ADD_MESSAGE",
        payload: response,
      });
      setTextMessage("");
    } catch (e) {
      const error = e as Error;
      console.log("error", error);
      dispatchPostMessage({
        type: "POST_MESSAGE_FAIL",
        payload: error.message,
      });
    }
  };
  return (
    <Box sx={{ height: "100vh", position: "relative" }}>
      <Box
        sx={{
          bgcolor: "greenyellow",
          p: "1.5rem",
          mb: "1.5rem",
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
          onClick={() => logoutUser && logoutUser()}
          variant="contained"
          sx={{ mr: "auto" }}
        >
          Logout
        </Button>
      </Box>
      <Stack sx={{ px: ".5rem" }}>
        <AvatarGroup>
          {userChats.chats.map((chat, index) => (
            <Box
              key={index}
              sx={{ "& :hover": { cursor: "pointer" } }}
              onClick={() => updateCurrentChat(chat)}
            >
              <UserChat chat={chat} user={user} />
            </Box>
          ))}
        </AvatarGroup>

        <ChatBox />
      </Stack>
      <Stack
        direction={"row"}
        spacing={1}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          mt: "1.5rem",
        }}
      >
        <BorderColorRounded />
        <Typography sx={{ fontStyle: "italic" }}>Killer is typing</Typography>
      </Stack>
      <PotentialChats />

      <TextField
        sx={{ position: "absolute", bottom: ".4rem" }}
        placeholder="Type Message..."
        onChange={(e) => setTextMessage(e.target.value)}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Typography
                sx={{ fontWeight: "bold", pr: ".3rem", fontSize: "1.2rem" }}
              >
                Send
              </Typography>
              <SendRounded
                color="primary"
                fontSize="large"
                onClick={() =>
                  handleSendTextMessage(
                    textMessage,
                    user,
                    currentChat._id,
                    setTextMessage
                  )
                }
              />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

export default ChatApp;
