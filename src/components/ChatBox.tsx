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
    <Box sx={{px:{xs:".5rem",md:"2rem"},mb:"2rem" }}>
      <Typography variant="h5" sx={{  py: {xs:"1rem",md:"3rem"},textAlign: "center" ,fontWeight:"600"}}>
        {recipient?.user.name}
      </Typography>
      {loading && <Typography>Loading...</Typography>}
      {!recipient && <Typography>No conversation selected yet...</Typography>}
      {messages.messages.map((message, index) => {
        const isRecipient = recipient?.user._id === message.senderId;

        return (
          <Box   key={index} sx={{display:"flex",alignItems:"center",justifyContent:isRecipient?"flex-start":"flex-end"}}>
          
          {isRecipient&&<Avatar {...stringAvatar(recipient?.user.name|| "Anonymous User")} />}

          <Card
            sx={{
              width: {xs:"max-content",md:"50%"},
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
