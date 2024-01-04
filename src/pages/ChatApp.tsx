import { useContext } from "react";
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
import PotentialChats from "../components/PotentialChats";
import ChatBox from "../components/ChatBox";

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
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Typography
                sx={{ fontWeight: "bold", pr: ".3rem", fontSize: "1.2rem" }}
              >
                Send
              </Typography>
              <SendRounded color="primary" fontSize="large" />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

export default ChatApp;
