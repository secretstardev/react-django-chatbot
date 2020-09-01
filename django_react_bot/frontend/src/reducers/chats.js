import { GET_CHATS, ADD_CHAT } from "../actions/types";

const initialState = {
  current_message: {},
  messages: []
};


export default function(state = initialState, action) {
  switch(action.type) {
    case GET_CHATS:
      return {
        ...state,
        messages: action.payload
      };
    case ADD_CHAT:
      return {
        messages: [...state.messages, action.payload.usermessage, action.payload.botmessage],
        current_message: action.payload.usermessage
      };
    default:
      return state;
  }
}
