import {
  GET_USER_DATA,
  SAVE_USER_DATA,
  REMOVE_USER_DATA,
} from "../Actions/userDataAction";

const initialState = {
  data: {},
};

const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_DATA:
      return {
        ...state,
        data: action.payload.data,
      };
    case SAVE_USER_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case REMOVE_USER_DATA:
      return {
        ...state,
        data: {},
      };
    default:
      return state;
  }
};

export default userDataReducer;
