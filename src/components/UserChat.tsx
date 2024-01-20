import { Chat } from "../pages/ChatApp";
import { UserPayload as User } from "../context/AuthContext";
import useFetchRecipient from "../hooks/useFetchRecipient";
import {
  Avatar,
  Typography,
  styled,
  Card,
  Box,
  Badge,
  AvatarGroup,
  useMediaQuery,
} from "@mui/material";
import stringAvatar from "../utils/functions/stringAvatar";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import moment from "moment";

export const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

function UserChat({ chat, user }: { chat: Chat; user: User }) {
  const chatContext = useContext(ChatContext);
  const updateCurrentChat = chatContext.updateCurrentChat;
  const recipient = useFetchRecipient(chat, user);
  const recipientName = recipient.recipient?.user.name || "Anonymous User";
  const onlineUsers = useContext(ChatContext).onlineUsers;
  const isOnline = onlineUsers.some(
    (onlineUser) => onlineUser.userId === recipient.recipient?.user._id
  );
  const matches = useMediaQuery("(min-width:960px)");
  return (
    <>
      {matches ? (
        <Card
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: ".5rem",
            p: "1rem",
            backgroundColor: "skyblue",

            "& :hover": { cursor: "pointer" },
          }}
        >
          <Box
            sx={{
              "& :hover": { cursor: "pointer" },
              display: "flex",
              alignItems: "center",
              gap: ".7rem",
            }}
            onClick={() => updateCurrentChat(chat)}
          >
            <UserBadge recipientName={recipientName} isOnline={isOnline} />

            <Typography>{recipient.recipient?.user.name}</Typography>
          </Box>
          <Typography>{moment(chat.createdAt).calendar()}</Typography>
        </Card>
      ) : (
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <AvatarGroup>
            <Box onClick={() => updateCurrentChat(chat)}>
              <UserBadge recipientName={recipientName} isOnline={isOnline} />
            </Box>
          </AvatarGroup>
        </Box>
      )}
    </>
  );
}

export function UserBadge({
  recipientName,
  isOnline,
}: {
  recipientName: string;
  isOnline: boolean;
}) {
  return (
    <>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
        sx={{
          "& .MuiBadge-badge": {
            backgroundColor: !isOnline ? "white" : "#44b700",
            color: !isOnline ? "white" : "#44b700",
          },
        }}
      >
        <Avatar {...stringAvatar(recipientName || "Anonyms")} />
      </StyledBadge>
    </>
  );
}

export default UserChat;
