import { ADD_PROJECT } from "../Actions/addProjectAction";


const addProjectReducer = (state = null, action) => {
  switch (action.type) {
    case ADD_PROJECT:
      return action.payload;
    default:
      return state;
  }
};

export default addProjectReducer;
