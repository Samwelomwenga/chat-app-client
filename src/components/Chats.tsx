import { useContext } from "react";
import { Stack, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import UserChat from "../components/UserChat";

function Chats() {
  const authContext = useContext(AuthContext);
  const user = authContext?.postState.user || {
    id: "",
    name: "",
    email: "",
    token: "",
  };
  const chatContext = useContext(ChatContext);
  const userChats = chatContext.fetchChatsState.userChats;

  return (
    <Stack
      sx={{
        position:"sticky",
        top: ".4rem",
        px: "1rem",
        flexDirection: {
          xs: "row",
          md: "column",
        },

        height: {
          md: "100vh",
        },
      }}
    >
      {!userChats.chats.length && <Typography >No chats yet</Typography>}
      {userChats.chats.map((chat, index) => (
        <UserChat key={index} chat={chat} user={user} />
      ))}
    </Stack>
  );
}

export default Chats;
