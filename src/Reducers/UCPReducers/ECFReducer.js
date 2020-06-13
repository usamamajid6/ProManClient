import { SAVE_ECF_RESULT, ECF_RESULT_STATUS } from "../../Actions";

const initialState = {
  result: "To Be Calculated!",
  status: false,
};


const ECFReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_ECF_RESULT:
      return {
        ...state,
        result: action.payload,
      };
    case ECF_RESULT_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default ECFReducer;
