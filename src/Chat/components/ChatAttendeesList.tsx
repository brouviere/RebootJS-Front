import * as React from 'react';
import ChatAttendeesListItem from './ChatAttendeesListItem';
import { IUser } from '../../Users/User.interface';
import { List, ListItem } from '@material-ui/core';

interface ChatAttendeesListProps {
  attendees: IUser[];
}

class ChatAttendeesList extends React.Component<ChatAttendeesListProps> {
  render(){
    return <React.Fragment>
      <List>
        {this.props.attendees.map((attendee, index) => {
          return (
            <ListItem key={index}>
              <ChatAttendeesListItem attendee={attendee}/>
            </ListItem>
          )
        })}
      </List>
      
    </React.Fragment>
  }
}

export default ChatAttendeesList;