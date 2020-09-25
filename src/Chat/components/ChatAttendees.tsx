import * as React from 'react';
import ChatAttendeesList from './ChatAttendeesList';

interface ChatAttendeesProps {
  targets: string[];
}

class ChatAttendees extends React.Component<ChatAttendeesProps> {
  render(){
    return <React.Fragment>
      <ChatAttendeesList targets={this.props.targets}  />
    </React.Fragment>
  }
}

export default ChatAttendees;