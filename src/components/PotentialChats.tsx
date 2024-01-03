import { useContext, useReducer } from "react";
import {
  Avatar,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from "@mui/material";
import { StyledBadge } from "./UserChat";
import stringAvatar from "../utils/functions/stringAvatar";
import { ChatContext } from "../context/ChatContext";
import { baseUrl, postRequest } from "../utils/services";
import fetchChatsReducer from "../utils/functions/fetchChatsReducer";
import { fetchChatsInitialState } from "../hooks/useFetch";
import { AuthContext } from "../context/AuthContext";

function PotentialChats() {
  const chatContext = useContext(ChatContext);
  const potentialChats = chatContext.potentialChatUsersState.potentialChatUsers;
  const authContext = useContext(AuthContext);
  const user = authContext?.postState.user || {
    id: "",
    name: "",
    email: "",
    token: "",
  };

  const [ ,dispatchFetchChats] = useReducer(
    fetchChatsReducer,
    fetchChatsInitialState
  );

  const handleCreateChat=async(firstId:string,secondId:string)=>{
    dispatchFetchChats({ type: "FETCH_CHATS_REQUEST" });
    try {
      const response= await postRequest(`${baseUrl}/chats`,{firstId,secondId});
      dispatchFetchChats({ type: "FETCH_CHATS_SUCCESS", payload: response });
      
    } catch (e) {
      const error = e as Error;
      console.log(error.message)
      dispatchFetchChats({ type: "FETCH_CHATS_FAIL", payload: {message:error.message,isError:true} });
      

    }

  }

  return (
    <SpeedDial
      ariaLabel="potential chat users speed dial"
      sx={{
        position: "absolute",
        bottom: 66,
        right: 10,
        "& .MuiSpeedDial-actions": {
          transform: "translateX(-10rem)",
        },
      }}
      icon={<SpeedDialIcon />}
    >
      {potentialChats.map((potentialChat, index) => (
        <SpeedDialAction
          sx={{
            "& .MuiSpeedDialAction-staticTooltipLabel": {
              textWrap: "nowrap",
              width: "150px",
              backgroundColor: "grey",
              color: "white",
            },
          }}
          key={index}
          icon={
            <StyledBadge>
              <Avatar {...stringAvatar(potentialChat.name || "Anonyms")} />
            </StyledBadge>
          }
          tooltipTitle={potentialChat.name}
          tooltipOpen={true}
          tooltipPlacement="right"
          onClick={()=>handleCreateChat(user.id,potentialChat._id)}
        />
      ))}
    </SpeedDial>
  );
}

export default PotentialChats;
