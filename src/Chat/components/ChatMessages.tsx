import * as React from 'react';
import ChatMessagesList from './ChatMessagesList';
import ChatMessagesForm from './ChatMessagesForm';
import { IConversation } from '../../Conversations/types';
import { patchConversationSeen, sendMessage } from '../../Api/ConversationsApi';
import { Typography } from '@material-ui/core';
import { IUser } from '../../Users/User.interface';

export interface IChatMessagesProps {
  conversation: IConversation;
  users: IUser[];
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

  getTargetInformation = () => {
    const { users, conversation} = this.props;
    const target = users.find(user => user._id === conversation.targets[0]);
    return target?.firstname
  }

  render(){
    const { conversation } = this.props;
    return <React.Fragment>
      {conversation.messages.length > 0 ? 
      <ChatMessagesList messages={conversation.messages}/> 
      : <Typography>This is the beginning of your conversation with {this.getTargetInformation()}</Typography>}
      <ChatMessagesForm
        conversationId={conversation._id}
        sendMessage={this.doSendMessage}/>
    </React.Fragment>
  }
}

export default ChatMessages;