import * as React from 'react';
import { IConversationMessage } from '../../Conversations/types';

interface ChatMessagesListItemProps {
  message: IConversationMessage
}

class ChatMessagesListItem extends React.Component<ChatMessagesListItemProps>{
  render(){
    return <React.Fragment>
      <span>{this.props.message.content}</span>
    </React.Fragment>
  }
}

export default ChatMessagesListItem;