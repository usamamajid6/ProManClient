import { UPDATE_TASK_STATUS } from "../Actions/UpdateTaskStatusAction";

const initialState = {
  data: {},
};

const updateTaskStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TASK_STATUS:
      return {
        ...state,
        data: action.payload.data,
      };
    default:
      return state;
  }
};

export default updateTaskStatusReducer;
