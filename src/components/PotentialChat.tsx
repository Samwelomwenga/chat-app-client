import { useContext, useReducer } from "react";
import { MenuItem, Typography } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import fetchChatsReducer from "../utils/functions/fetchChatsReducer";
import { baseUrl, postRequest } from "../utils/services";
import { fetchChatsInitialState } from "../hooks/useFetch";
import { PotentialUser } from "../hooks/useFetchPotentialChatUsers";
import { UserChats } from "../pages/ChatApp";
import { UserBadge } from "./UserChat";

export type AxiosError = {
  response?: {
    data: {
      message: string;
    };
  };
};
type PotentialChatProps = {
  potentialChat: PotentialUser;
  handleClose: () => void;
};

function PotentialChat({ potentialChat, handleClose }: PotentialChatProps) {
  const authContext = useContext(AuthContext);
  const user = authContext?.postState.user || {
    id: "",
    name: "",
    email: "",
    token: "",
  };

  const [, dispatchFetchChats] = useReducer(
    fetchChatsReducer,
    fetchChatsInitialState
  );

  const handleCreateChat = async (firstId: string, secondId: string) => {
    dispatchFetchChats({ type: "FETCH_CHATS_REQUEST" });
    try {
      const response = await postRequest<
        { firstId: string; secondId: string },
        UserChats
      >(`${baseUrl}/chats`, { firstId, secondId });
      dispatchFetchChats({ type: "FETCH_CHATS_SUCCESS", payload: response });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        const message = axiosError.response?.data.message;
        console.log(message);
        dispatchFetchChats({
          type: "FETCH_CHATS_FAIL",
          payload: { message: message || "", isError: true },
        });
      } else {
        const e = error as Error;
        dispatchFetchChats({
          type: "FETCH_CHATS_FAIL",
          payload: { message: e.message || "", isError: true },
        });
      }
    }
  };
  const onlineUsers = useContext(ChatContext).onlineUsers;
  const isOnline = onlineUsers.some(
    (onlineUser) => onlineUser.userId === potentialChat._id
  );
  return (
    <MenuItem
      onClick={() => {
        handleCreateChat(user.id, potentialChat._id);
        handleClose();
      }}
    >
      <UserBadge recipientName={potentialChat.name} isOnline={isOnline} />
      <Typography sx={{ pl: ".7rem" }}>{potentialChat.name}</Typography>
    </MenuItem>
  );
}

export default PotentialChat;
