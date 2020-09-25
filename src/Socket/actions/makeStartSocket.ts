import { connect } from "../../Api/SocketClient";
import { IAppState } from "../../appReducer";
import { updateConversationsMessage } from "../../Chat/actions/updateConversationsMessageAction";
import { IConversationMessage } from "../../Conversations/types";

export function makeStartSocket() {
  return (dispatch: any, getState: () => IAppState) => {
    const socket = connect();

    socket.on('connect', () => {
      console.log('Received user connection');
    });

    socket.on('chat-message', (message: IConversationMessage) => {
      console.log('new message incoming');
      dispatch(updateConversationsMessage(message))
    })
  }
}