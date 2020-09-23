
import * as React from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../../appReducer';
import { IConversation } from '../types';
import ConversationListItem from './ConversationsListItem';

interface ConversationsListProps {
  conversations: IConversation[];
}

class ConversationsList extends React.Component<ConversationsListProps> {

  render(){
    return <React.Fragment>
      {this.props.conversations.map((conversation: IConversation, index: number) => {
        return <ConversationListItem conversation={conversation} key={index}/>
      })}
    </React.Fragment>
  }

}

const mapStateToProps = ({conversation} : IAppState) => ({
  conversations: conversation.conversations
})
export default connect(mapStateToProps)(ConversationsList);