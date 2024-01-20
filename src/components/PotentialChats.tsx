import { useContext, useState } from "react";
import { Fab, Menu } from "@mui/material";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { ChatContext } from "../context/ChatContext";
import PotentialChat from "./PotentialChat";

function PotentialChats() {
  const chatContext = useContext(ChatContext);
  const potentialChats = chatContext.potentialChatUsersState.potentialChatUsers;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: "5.5rem",
          right: { xs: "1rem", md: "3rem" },
        }}
        onClick={handleClick}
      >
        <ChatBubbleIcon />
      </Fab>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          position: "fixed",
          top: "-1rem",
          left: { xs: "-1rem", md: "-2rem" },
          maxHeight: "70%",
          px: "3rem",
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        {potentialChats.map((potentialChat, index) => (
          <PotentialChat
            key={index}
            potentialChat={potentialChat}
            handleClose={handleClose}
          />
        ))}
      </Menu>
    </>
  );
}

export default PotentialChats;
