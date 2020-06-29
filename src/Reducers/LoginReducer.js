import { LOGIN } from "../Actions/LoginAction";

const LoginReducer = (state = null, action) => {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    default: {
      return state;
    }
  }
};
export default LoginReducer;
