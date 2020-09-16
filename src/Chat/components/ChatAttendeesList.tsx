import * as React from 'react';
import ChatAttendeesListItem from './ChatAttendeesListItem';
import { IUser } from '../../Users/User.interface';
import { List } from '@material-ui/core';

interface ChatAttendeesListProps {
  attendees: IUser[];
}

class ChatAttendeesList extends React.Component<ChatAttendeesListProps> {
  render(){
    return <React.Fragment>
      <List>
        {this.props.attendees.map((attendee, index) => {
          return (
            <ChatAttendeesListItem key={index} attendee={attendee}/>
          )
        })}
      </List>
      
    </React.Fragment>
  }
}

export default ChatAttendeesList;