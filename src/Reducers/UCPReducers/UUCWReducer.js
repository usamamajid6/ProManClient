import { SAVE_UUCW_RESULT, UUCW_RESULT_STATUS } from "../../Actions";

const initialState = {
  result: "To Be Calculated!",
  status: false,
};

const UUCWReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_UUCW_RESULT:
      return {
        ...state,
        result: action.payload,
      };
    case UUCW_RESULT_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default UUCWReducer;
