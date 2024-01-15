import { useContext } from "react";
import {   Stack} from "@mui/material";
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
        px: ".5rem",
        bgcolor: "grey",
        flexDirection:{
          xs:"row",
          md:"column"
        },
        
        height: {
          md: "100vh",
        },
      }}
    >
      {userChats.chats.map((chat, index) => (
            <UserChat key={index} chat={chat} user={user} />
         
        )
      )}
      {/* <Box sx={{ display: "flex", alignItems: "flex-start" }}>
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
    </Box> */}
    </Stack>
  );
}

export default Chats;
