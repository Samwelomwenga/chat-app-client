import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import useFetchRecipient from "../hooks/useFetchRecipient";
import moment from "moment";
import stringAvatar from "../utils/functions/stringAvatar";

const ChatBox = () => {
  const authContext = useContext(AuthContext);
  const chatContext = useContext(ChatContext);
  const messages = chatContext.messagesState.messages;
  const currentChat = chatContext.currentChat;
  const user = authContext?.postState.user || {
    id: "",
    name: "",
    email: "",
    token: "",
  };

  const recipientState = useFetchRecipient(currentChat, user);
  const { recipient, loading } = recipientState;

  return (
    <Box sx={{ pt: "1rem" }}>
      <Typography variant="h6" sx={{ textAlign: "center" ,fontWeight:"600"}}>
        {recipient?.user.name}
      </Typography>
      {loading && <Typography>Loading...</Typography>}
      {!recipient && <Typography>No conversation selected yet...</Typography>}
      {messages.messages.map((message, index) => {
        const isRecipient = recipient?.user._id === message.senderId;

        return (
          <Box sx={{display:"flex",alignItems:"center",justifyContent:isRecipient?"flex-start":"flex-end"}}>
          {isRecipient&&<Avatar {...stringAvatar(recipient?.user.name|| "Anonymous User")} />}

          <Card
            key={index}
            sx={{
              width: "70%",
              mb: "2rem",
              bgcolor: !isRecipient ? "lightgreen" : "primary.main",
            }}
          >
            <CardContent>
              <Typography>{message.text}</Typography>
              <Typography>{moment(message.createdAt).calendar()}</Typography>
            </CardContent>
          </Card>
          </Box>
        );
      })}
    </Box>
  );
};

export default ChatBox;
