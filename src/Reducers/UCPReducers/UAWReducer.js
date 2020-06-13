import { SAVE_UAW_RESULT, UAW_RESULT_STATUS } from "../../Actions";

const initialState = {
  result: "To Be Calculated!",
  status: false,
};

const UAWReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_UAW_RESULT:
      return {
        ...state,
        result: action.payload,
      };
    case UAW_RESULT_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default UAWReducer;
