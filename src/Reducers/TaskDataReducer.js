import { GET_TASK_DATA } from "../Actions/TaskDataAction";

const initialState = {
  data: {},
};

const getTaskData = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK_DATA:
      return {
        ...state,
        data: action.payload.data,
      };
    default:
      return state;
  }
};

export default getTaskData;
