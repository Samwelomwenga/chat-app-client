import { Chat } from "../pages/ChatApp";
import { UserPayload as User } from "../context/AuthContext";
import useFetchRecipient from "../hooks/useFetchRecipient";
import { Avatar, Badge, styled } from "@mui/material";
import stringAvatar from "../utils/functions/stringAvatar";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
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
  const recipient = useFetchRecipient(chat, user);
  const onlineUsers=useContext(ChatContext).onlineUsers;
  const isOnline=onlineUsers.some((onlineUser)=>onlineUser.userId===recipient.recipient?.user._id);
  return (
    <>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
        sx={{"& .MuiBadge-badge":{
          backgroundColor:!isOnline?"white":"#44b700",
          color:!isOnline?"white":"#44b700",
        }}}
      >
        <Avatar
          {...stringAvatar(recipient.recipient?.user.name || "Anonyms")}
        />
      </StyledBadge>
    </>
  );
}

export default UserChat;
