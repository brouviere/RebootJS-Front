import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import * as React from 'react';
import { IUser } from '../../Users/User.interface';

interface ChatAttendeesListItemProps {
  attendee: IUser;
}

class ChatAttendeesListItem extends React.Component<ChatAttendeesListItemProps>{
  render(){
    return <ListItem>
      <ListItemAvatar>
        <Avatar>{this.props.attendee.firstname[0]}</Avatar>
      </ListItemAvatar>
      <ListItemText>{this.props.attendee.firstname} {this.props.attendee.lastname}</ListItemText>
    </ListItem>
  }
}

export default ChatAttendeesListItem;
