import { REGISTER } from "../Actions/RegisterAction";

const RegisterReducer = (state = null, action) => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default RegisterReducer;
