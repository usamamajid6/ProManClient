import { LOGIN, LOGIN_GOOGLE_FB } from "../Actions/LoginAction";

const LoginReducer = (state = null, action) => {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    case LOGIN_GOOGLE_FB:
      return action.payload;
    default: {
      return state;
    }
  }
};
export default LoginReducer;
