import * as React from 'react';
import { AvatarGroup } from '@material-ui/lab';
import { Avatar, ListItem, ListItemAvatar, ListItemText, Divider } from '@material-ui/core';
import { IConversation } from '../types';
import { IUser } from '../../Users/User.interface';
import { Link } from 'react-router-dom';

interface ConversationListItemProps {
  conversation: IConversation;
  users: IUser[];
}

class ConversationListItem extends React.Component<ConversationListItemProps> {

  render() {
    return <React.Fragment>
      <Link to={`/chats/${this.props.conversation._id}`}>
        <ListItem>
          <ListItemAvatar>
            <AvatarGroup max={3}>
                {this.props.conversation.targets.map((target, index) => <Avatar key={index}>{this.getUserFromList(target)?.firstname[0] || 'Unkonwn user'}</Avatar>)}
            </AvatarGroup>
          </ListItemAvatar>
          <ListItemText
            primary={this.props.conversation.messages[0].content}
            secondary={this.props.conversation.updatedAt.toLocaleString()}
          >
          </ListItemText>
        </ListItem>
      </Link>
      <Divider />
    </React.Fragment>
  }


  getUserFromList = (id: string) => {
    return this.props.users.find((user: IUser) => user._id === id)
  }

}



export default ConversationListItem;