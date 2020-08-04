import { GET_NOTIFICATIONS } from "../Actions/GetNotificationsAction";

const initialState = { data: {} };

const GetNotificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return {
        ...initialState,
        data: action.payload.data,
      };
    default: {
      return state;
    }
  }
};
export default GetNotificationsReducer;
