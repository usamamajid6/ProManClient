import { GET_USER_BY_EMAIL } from "../Actions/GetUserByEmailAction";

const UserByEmailReducer = (state = null, action) => {
  switch (action.type) {
    case GET_USER_BY_EMAIL:
      return action.payload;
    default: {
      return state;
    }
  }
};
export default UserByEmailReducer;
