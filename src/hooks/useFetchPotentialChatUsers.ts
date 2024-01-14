import { useEffect, useReducer } from "react";
import { UserPayload as User } from "../context/AuthContext";

import { baseUrl, getRequest } from "../utils/services";
import { UserChats } from "../pages/ChatApp";
import potentialChatUsersReducer from "../utils/functions/potentialChatUsersReducer";

export type PotentialChatUsersInitialState = {
  loading: boolean;
  error: null | { message: string; isError: boolean };
  potentialChatUsers: PotentialUser[];
};

export const potentialChatUsersInitialState: PotentialChatUsersInitialState = {
  loading: false,
  error: null,
  potentialChatUsers: [],
};

export type PotentialUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};

export type Users = {
  users: PotentialUser[];
};
const useFetchPotentialChatUsers = (userChats: UserChats, user: User) => {
  const [potentialChatUsersState, dispatchPotentialChatUsers] = useReducer(
    potentialChatUsersReducer,
    potentialChatUsersInitialState
  );
  useEffect(() => {
    let ignore = false;
    const getPotentialChatUsers = async () => {
      dispatchPotentialChatUsers({ type: "FETCH_CHATS_REQUEST" });
      try {
        const users = await getRequest<Users>(`${baseUrl}/users`);

        const potentialChatUsers = users.users.filter((u) => {
          let isChatCreated = false;

          if (user.id === u._id) return false;
          if (userChats) {
            isChatCreated = userChats.chats.some((c) => {
              return c.members[0] === u._id || c.members[1] === u._id;
            });
          }
          return !isChatCreated;
        });
        if (!ignore) {
          dispatchPotentialChatUsers({
            type: "FETCH_CHATS_SUCCESS",
            payload: potentialChatUsers,
          });
        }
      } catch (e) {
        const error = e as Error;

        if (!ignore) {
          dispatchPotentialChatUsers({
            type: "FETCH_CHATS_FAIL",
            payload: { message: error.message, isError: true },
          });
        }
      }
    };
    getPotentialChatUsers();
    return () => {
      ignore = true;
    };
  }, [user.id, userChats]);
  return potentialChatUsersState;
};
export default useFetchPotentialChatUsers;
