import * as React from 'react';
import ChatMessageListItem from './ChatMessagesListItem';
import { IConversationMessage } from '../../Conversations/types';
import { Timeline } from '@material-ui/lab';

interface ChatMessageListProps {
  messages?: IConversationMessage[];
}

class ChatMessagesList extends React.Component<ChatMessageListProps> {

  render(){
    return <React.Fragment>
      <Timeline align="alternate">
        {this.props.messages?.map((message, index) => <ChatMessageListItem key={index} message={message}/>)}
      </Timeline>
      
    </React.Fragment>
  }
}

export default ChatMessagesList;