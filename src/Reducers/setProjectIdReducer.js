import { SET_PROJECT_ID } from "../Actions/setProjectIdAction";

const setProjectIdReducer = (state = null, action) => {
  switch (action.type) {
    case SET_PROJECT_ID:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};

export default setProjectIdReducer;
