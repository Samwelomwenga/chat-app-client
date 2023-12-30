import { RecipientDetails, RecipientInitialState } from "../../hooks/useFetchRecipient"

type FetchRecipientAction=
|{
    type:"FETCH_RECIPIENT_REQUEST"

}
|{
    type:"FETCH_RECIPIENT_SUCCESS"
    payload:RecipientDetails
}
|{
    type:"FETCH_RECIPIENT_FAIL"
    payload:{message:string,isError:boolean}
}


const fetchRecipientReducer = (state:RecipientInitialState, action:FetchRecipientAction) => {
  switch (action.type) {
    case "FETCH_RECIPIENT_REQUEST": {
      return { ...state, loading: true, error: null };
    }
    case "FETCH_RECIPIENT_SUCCESS": {
      return {
        ...state,
        loading: false,
        error: null,
        recipient: action.payload,
      };
    }
    case "FETCH_RECIPIENT_FAIL": {
      return { ...state, loading: false, error: action.payload };
    }
    default:
      return state;
  }
};
export default fetchRecipientReducer;
