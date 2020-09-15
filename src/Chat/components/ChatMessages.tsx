import * as React from 'react';
import ChatMessagesList from './ChatMessagesList';
import ChatMessagesForm from './ChatMessagesForm';
import { IConversationMessage, IConversation } from '../../Conversations/types';

export interface IChatMessagesProps {
  messages?: IConversationMessage[];
  sendMessage: (conversationId: string, emitter: string, targets: string[], content: string) => void;
  conversation: IConversation;
}

class ChatMessages extends React.Component<IChatMessagesProps> {

  render(){
    return <React.Fragment>
      <ChatMessagesList messages={this.props.messages}/>
      <ChatMessagesForm
        conversationId={this.props.conversation._id}
        targets={this.props.conversation.targets} sendMessage={this.props.sendMessage}/>
    </React.Fragment>
  }
}

export default ChatMessages;