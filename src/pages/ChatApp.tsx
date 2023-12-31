import { useContext } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { SendRounded, BorderColorRounded } from "@mui/icons-material";
import { AuthContext } from "../context/AuthContext";
import stringAvatar from "../utils/functions/stringAvatar";
import { ChatContext } from "../context/ChatContext";
import useFetchRecipient from "../hooks/useFetchRecipient";
type Chat={
  _id:string;
  members:string[];
  createdAt:string;
  updatedAt:string;

}
type Chats=Chat[];

 export type UserChats={
  chats:Chats;
}

function ChatApp() {
  const context = useContext(AuthContext);
  const user = context?.postState.user || { id: '', name: '', email: '', token: '' };
  const logoutUser = context?.logoutUser;
  const fetchChatsState = useContext(ChatContext);
  const userChats=fetchChatsState.userChats;
  // console.log(Array.isArray(userChats.chats))
  // if (Array.isArray(userChats.chats)) {
  //   userChats.chats.map((chat) => console.log("chat", chat));
  // }
  // console.log("userChats",fetchChatsState.userChats);
  const chat = userChats?.chats[0] || { _id: '', members: [], createdAt: '', updatedAt: '' };
  const recipient=useFetchRecipient(chat,user)
  console.log("Recipient",recipient.recipient?.user.name)

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
        <Card sx={{ width: "75%", mb: "2rem", bgcolor: "red" }}>
          <CardContent>
            <Typography>
              Lorem ipsum dolor, sit amet consectng elit. Voluptas tenetur
              repellenduBeatae?
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ width: "75%" }}>
          <CardContent>
            <Typography>
              Lorem ipsum dolor, sit amet consectng elit. Voluptas tenetur
              repellenduBeatae?
            </Typography>
          </CardContent>
        </Card>
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
