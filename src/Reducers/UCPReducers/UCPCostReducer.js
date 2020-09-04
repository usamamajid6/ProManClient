import { UCP_COST_RESULT_STATUS, SAVE_UCP_COST_RESULT } from "../../Actions";

const initialState = {
  result: "To Be Calculated!",
  status: false,
};

const UCPCostReducer = (state = initialState, action) => {
  switch (action.type) {
    case UCP_COST_RESULT_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case SAVE_UCP_COST_RESULT:
      return {
        ...state,
        result: action.payload,
      };
    default:
      return state;
  }
};

export default UCPCostReducer;
