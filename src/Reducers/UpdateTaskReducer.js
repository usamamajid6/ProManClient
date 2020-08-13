import { UPDATE_TASK } from "../Actions/UpdateTaskAction";

const initialState = {
  data: {},
};

const updateTaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TASK:
      return {
        ...state,
        data: action.payload.data,
      };
    default:
      return state;
  }
};

export default updateTaskReducer;
