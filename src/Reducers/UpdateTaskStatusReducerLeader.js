import { UPDATE_TASK_STATUS_LEADER } from "../Actions/UpdateTaskStatusLeaderAction";

const initialState = {
  data: {},
};

const updateTaskStatusLeaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TASK_STATUS_LEADER:
      return {
        ...state,
        data: action.payload.data,
      };
    default:
      return state;
  }
};

export default updateTaskStatusLeaderReducer;
