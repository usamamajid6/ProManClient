import { GET_CHATS_MESSAGES } from "../Actions/ChatsDataAction";

const ChatsDataReducer = (state = null, action) => {
  switch (action.type) {
    case GET_CHATS_MESSAGES:
      return action.payload;
    default: {
      return state;
    }
  }
};
export default ChatsDataReducer;
