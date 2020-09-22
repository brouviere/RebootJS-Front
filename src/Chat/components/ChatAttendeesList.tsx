import * as React from 'react';
import ChatAttendeesListItem from './ChatAttendeesListItem';
import { IUser } from '../../Users/User.interface';
import { List } from '@material-ui/core';
import { IAppState } from '../../appReducer';
import { connect } from 'react-redux';

interface ChatAttendeesListProps {
  attendees: IUser[];
  targets?: string[];
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

const mapStateToProps = ({user}: IAppState, {targets}: {targets?: string[]}) => ({
  attendees: user.users.filter(user => targets?.includes(user._id)) || []
})

export default connect(mapStateToProps)(ChatAttendeesList);