import { ADD_TEAM } from "../Actions/addTeamAction";

const addTeamReducer = (state = null, action) => {
  switch (action.type) {
    case ADD_TEAM:
      return action.payload;
    default:
      return state;
  }
};

export default addTeamReducer;
