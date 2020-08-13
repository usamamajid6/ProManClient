import { ADD_MEMBER_TO_TASK } from "../Actions/AddMemberToTaskAction";

const initialState = {
  data: {},
};

const addMemberToTaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MEMBER_TO_TASK:
      return {
        ...state,
        data: action.payload.data,
      };
    default:
      return state;
  }
};

export default addMemberToTaskReducer;
