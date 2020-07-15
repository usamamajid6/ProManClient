import { ADD_MEMBER_TO_PROJECT } from "../Actions/AddMemberToProjectAction";

const initialState = {
  data: {},
};

const addMemberToProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MEMBER_TO_PROJECT:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default addMemberToProjectReducer;
