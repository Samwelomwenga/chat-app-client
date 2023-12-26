import { PostUserInfoState } from "../../context/AuthContext";

export type PostUserInfoAction =
  | { type: "POST_USER_INFO_REQUEST" }
  | {
      type: "POST_USER_INFO_SUCCESS" | "POST_USER_INFO_FAIL";
      payload: string;
    };

const postUserInfoReducer = (
  state: PostUserInfoState,
  action: PostUserInfoAction
): PostUserInfoState => {
  switch (action.type) {
    case "POST_USER_INFO_REQUEST": {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case "POST_USER_INFO_SUCCESS": {
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
      };
    }
    case "POST_USER_INFO_FAIL": {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    default:
        return state;
  }
};
export default postUserInfoReducer;
