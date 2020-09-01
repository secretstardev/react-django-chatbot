import { GET_CHATS, ADD_CHAT } from './types';



// GET CHATS
export const getChats = () => (dispatch) => {
  dispatch({
    type: GET_CHATS,
    payload: []
  });
}

// ADD CHAT
export const addChat = (chat) => (dispatch) => {
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(chat)
  })
    .then(res => res.json())
    .then(post => dispatch({
      type: ADD_CHAT,
      payload: {
        usermessage: chat,
        botmessage: {
          index: chat.index+1,
          message: post.message,
          isbotmessage: true
        }
      }
    }));
}
