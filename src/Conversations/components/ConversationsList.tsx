import * as React from 'react';
import { IConversation } from '../types';
import { getConversations } from '../../Api/ConversationsApi';
import ConversationListItem from './ConversationsListItem';
import { IUser } from '../../Users/User.interface';

interface ConversationsListState {
  conversations: IConversation[];
}

interface ConversationsListProps {
  users: IUser[];
}

class ConversationsList extends React.Component<ConversationsListProps, ConversationsListState> {
  constructor(props: ConversationsListProps){
    super(props);
    this.state = {
      conversations: []
    }
  }

  componentDidMount() {
    getConversations()
      .then(conversations => {
        this.setState({ conversations: conversations })
      })
  }

  render(){
    return <React.Fragment>
      {this.state.conversations.map((conversation: IConversation, index: number) => {
        return <ConversationListItem users={this.props.users} conversation={conversation} key={index}/>
      })}
    </React.Fragment>
  }

}

export default ConversationsList;