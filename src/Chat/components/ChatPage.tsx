import * as React from 'react';
import ChatMessages from './ChatMessages';
import ChatAttendees from './ChatAttendees';
import { IConversation } from '../../Conversations/types';
import { match, withRouter } from 'react-router-dom';
import { IUser } from '../../Users/User.interface';
import { Grid, Container, Paper, Theme, createStyles, withStyles } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
  h100:{
    height: '100%'
  }
});

interface ChatPageProps {
  match: match<{conversationId: string }>;
  location: any;
  history: any;
  conversations: IConversation[];
  users: IUser[];
  classes: any;
  sendMessage: (conversationId: string, emitter: string, targets: string[], content: string) => void;
}


class ChatPage extends React.Component<ChatPageProps> {


  
  render(){
    let conversation = this.props.conversations?.find(conv => conv._id === this.props.match.params.conversationId);
    let attendeesList: IUser[] = [];

    if(!!conversation) {
      conversation.targets.forEach((target: string) => {
        const user = this.props.users.find( (user: IUser) => user._id === target);
        if(user) {
          attendeesList.push(user);
        }
      });
    }

    return !!conversation ? <React.Fragment>
      <Container className={this.props.classes.h100}>
        <Grid container spacing={2} className={this.props.classes.h100}>
          <Grid item xs={4} className={this.props.classes.h100}>
            <Paper elevation={3} className={this.props.classes.h100}>
              <ChatMessages conversation={conversation} messages={conversation.messages} sendMessage={this.props.sendMessage}/>
            </Paper>
          </Grid>
          
          <Grid item xs={4} className={this.props.classes.h100}>
            <Paper elevation={3} className={this.props.classes.h100}>
              <ChatAttendees attendees={attendeesList}/>
              </Paper>
          </Grid>
        </Grid>
      </Container>
      
    </React.Fragment> : null
  }
}

export default withRouter(withStyles(styles)(ChatPage));
