import * as React from 'react';
import { IUser } from '../../Users/User.interface';

interface ChatAttendeesListItemProps {
  attendee: IUser;
}

class ChatAttendeesListItem extends React.Component<ChatAttendeesListItemProps>{
  render(){
    return <React.Fragment>
      <h1>{this.props.attendee.firstname}</h1>
    </React.Fragment>
  }
}

export default ChatAttendeesListItem;
