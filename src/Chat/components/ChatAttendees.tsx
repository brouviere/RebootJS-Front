import * as React from 'react';
import ChatAttendeesList from './ChatAttendeesList';

interface ChatAttendeesProps {
}

class ChatAttendees extends React.Component<ChatAttendeesProps> {
  render(){
    return <React.Fragment>
      <ChatAttendeesList />
    </React.Fragment>
  }
}

export default ChatAttendees;