import { Typography } from '@material-ui/core';
import { TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator } from '@material-ui/lab';
import * as React from 'react';
import { IConversationMessage } from '../../Conversations/types';

interface ChatMessagesListItemProps {
  message: IConversationMessage
}

class ChatMessagesListItem extends React.Component<ChatMessagesListItemProps>{
  render(){
    return <React.Fragment>
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography color="textSecondary">{this.props.message.createdAt}</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
          <TimelineContent>{this.props.message.content}</TimelineContent>
      </TimelineItem>
    </React.Fragment>
  }
}

export default ChatMessagesListItem;