import { SAVE_UCP_RESULT, UCP_RESULT_STATUS } from "../../Actions";

const initialState = {
  result: "To Be Calculated!",
  status: false,
};

const UCPReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_UCP_RESULT:
      return {
        ...state,
        result: action.payload,
      };
    case UCP_RESULT_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default UCPReducer;
