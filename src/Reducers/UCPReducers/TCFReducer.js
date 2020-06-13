import { SAVE_TCF_RESULT, TCF_RESULT_STATUS } from "../../Actions";

const initialState = {
  result: "To Be Calculated!",
  status: false,
};

const TCFReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_TCF_RESULT:
      return {
        ...state,
        result: action.payload,
      };
    case TCF_RESULT_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default TCFReducer;
