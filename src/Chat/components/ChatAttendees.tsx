import * as React from 'react';
import ChatAttendeesList from './ChatAttendeesList';
import { IUser } from '../../Users/User.interface';

interface ChatAttendeesProps {
  attendees: IUser[];
}

class ChatAttendees extends React.Component<ChatAttendeesProps> {
  render(){
    return <React.Fragment>
      <ChatAttendeesList attendees={this.props.attendees}/>
    </React.Fragment>
  }
}

export default ChatAttendees;