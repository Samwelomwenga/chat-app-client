import { useContext } from "react";
import { Avatar, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material"
import { StyledBadge } from "./UserChat"
import stringAvatar from "../utils/functions/stringAvatar"
import { ChatContext } from "../context/ChatContext";



function PotentialChats() {
  const chatContext = useContext(ChatContext);

  const potentialChats=chatContext.potentialChatUsersState.potentialChatUsers;
console.log(potentialChats)
  return (
    <SpeedDial
    ariaLabel="potential chat users speed dial"
    sx={{ position: 'absolute', bottom: 66, right: 10,"& .MuiSpeedDial-actions":{
      transform: 'translateX(-10rem)',
    } }}
    icon={<SpeedDialIcon />}
  >
    {potentialChats.map((potentialChat,index) => (
      <SpeedDialAction
      sx={{"& .MuiSpeedDialAction-staticTooltipLabel":{
        textWrap:"nowrap",
        width:"150px",
        backgroundColor:"grey",
        color:"white"
      
      }}}
        key={index}
        icon={ <StyledBadge>
          <Avatar
            {...stringAvatar(potentialChat.name || "Anonyms")}
          />
          </StyledBadge>}
        tooltipTitle={potentialChat.name}
        tooltipOpen={true}
        tooltipPlacement="right"
      />
    ))}
  </SpeedDial>
  )
}

export default PotentialChats