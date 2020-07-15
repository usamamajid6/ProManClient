import { UPDATE_SUB_TASK_STATUS } from "../Actions/UpdateSubTaskStatusAction";

const initialState = {
  data: {},
};

const updateSubTaskStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SUB_TASK_STATUS:
      return {
        ...state,
        data: action.payload.data,
      };
    default:
      return state;
  }
};

export default updateSubTaskStatusReducer;
