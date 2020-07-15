import { ADD_MEMBER_TO_TEAM } from "../Actions/AddMemberToTeamAction";

const initialState = {
  data: {},
};

const addMemberToTeamReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MEMBER_TO_TEAM:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default addMemberToTeamReducer;
