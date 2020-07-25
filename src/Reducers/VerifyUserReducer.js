import { VERIFY_USER } from "../Actions/VerifyUserAction";

const verifyUserReducer = (state = null, action) => {
  switch (action.type) {
    case VERIFY_USER:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default verifyUserReducer;
