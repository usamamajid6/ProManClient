import { INCREAMENT, DECREAMENT } from "../Actions";

const initialState = {
  num: 1,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREAMENT:
      return {
        ...state,
        num: state.num + action.payload,
      };
    case DECREAMENT:
      return {
        ...state,
        num: state.num - action.payload,
      };
    default:
      return state;
  }
};

export default counterReducer;