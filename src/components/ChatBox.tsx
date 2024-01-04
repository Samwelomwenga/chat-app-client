import { Box, Card, CardContent, Typography } from "@mui/material";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import useFetchRecipient from "../hooks/useFetchRecipient";
import moment from "moment";

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
  console.log("messages", messages);

  return (
    <Box sx={{ bgcolor: "grey", pt: "1rem" }}>
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        {recipientState.recipient?.user.name}
      </Typography>
      {recipientState.loading && <Typography>Loading...</Typography>}
      {!recipientState.recipient && (
        <Typography>No conversation selected yet...</Typography>
      )}
      {messages.messages.map((message, index) => (
        <Card key={index} sx={{ width: "75%", mb: "2rem" }}>
          <CardContent>
            <Typography>{message.text}</Typography>
            <Typography>{moment(message.createdAt).calendar()}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ChatBox;
