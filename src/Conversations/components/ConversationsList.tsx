import * as React from 'react';
import { IConversation } from '../types';
import ConversationListItem from './ConversationsListItem';
import { IUser } from '../../Users/User.interface';

interface ConversationsListProps {
  users: IUser[];
  conversations: IConversation[];
}

class ConversationsList extends React.Component<ConversationsListProps> {

  render(){
    console.log(this.props.conversations);
    return <React.Fragment>
      {this.props.conversations.map((conversation: IConversation, index: number) => {
        return <ConversationListItem users={this.props.users} conversation={conversation} key={index}/>
      })}
    </React.Fragment>
  }

}

export default ConversationsList;