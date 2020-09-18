import * as React from 'react';
import ChatMessagesList from './ChatMessagesList';
import ChatMessagesForm from './ChatMessagesForm';
import { IConversation } from '../../Conversations/types';
import { patchConversationSeen, sendMessage } from '../../Api/ConversationsApi';

export interface IChatMessagesProps {
  conversation: IConversation;
}

class ChatMessages extends React.Component<IChatMessagesProps> {

  conversationSeen = () => {
    if(this.props.conversation) { 
      patchConversationSeen(this.props.conversation._id)
    }
  }


  doSendMessage = async (message: string) => {
    const { conversation } = this.props;
    if(conversation) {
      const sentMessage = await sendMessage(conversation._id, conversation.targets, message);
      this.setState({
        conversation: {
          ...conversation,
          messages: [...conversation.messages, sentMessage]
        }
      })
    }
  }

  render(){
    return <React.Fragment>
      <ChatMessagesList messages={this.props.conversation.messages}/>
      <ChatMessagesForm
        conversationId={this.props.conversation._id}
        sendMessage={this.doSendMessage}/>
    </React.Fragment>
  }
}

export default ChatMessages;