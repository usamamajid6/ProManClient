import {
  GET_PROJECT_DATA,
  CLEAR_PROJECT_DATA,
} from "../Actions/projectDataAction";

const projectDataReducer = (state = null, action) => {
  switch (action.type) {
    case GET_PROJECT_DATA:
      return action.payload;
    case CLEAR_PROJECT_DATA:
      return null;
    default: {
      return state;
    }
  }
};
export default projectDataReducer;
