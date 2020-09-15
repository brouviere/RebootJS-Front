import * as React from 'react';
import ChatMessageListItem from './ChatMessagesListItem';
import { IConversationMessage } from '../../Conversations/types';

interface ChatMessageListProps {
  messages?: IConversationMessage[];
}

class ChatMessagesList extends React.Component<ChatMessageListProps> {

  render(){
    return <React.Fragment>
      {this.props.messages?.map((message, index) => <ChatMessageListItem key={index} message={message}/>)}
      
    </React.Fragment>
  }
}

export default ChatMessagesList;