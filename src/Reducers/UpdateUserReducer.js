import { UPDATE_USER } from "../Actions/UpdateUserAction";

const initialState = {
  data: {},
};

const updateTaskStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        data: action.payload.data,
      };
    default:
      return state;
  }
};

export default updateTaskStatusReducer;
