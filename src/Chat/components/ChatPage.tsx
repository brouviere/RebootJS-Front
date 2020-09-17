import * as React from 'react';
import ChatMessages from './ChatMessages';
import ChatAttendees from './ChatAttendees';
import { IConversation } from '../../Conversations/types';
import { match, withRouter } from 'react-router-dom';
import { IUser } from '../../Users/User.interface';
import history from '../../history';
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
}

interface ChatPageState {
  conversation?: IConversation;
}

class ChatPage extends React.Component<ChatPageProps, ChatPageState> {
  constructor(props: ChatPageProps){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    let conversation = this.props.conversations.find(conv => conv._id === this.props.match.params.conversationId);

    if(!conversation) {
      const target = new URLSearchParams(this.props.location.search).get('target');
      if(!target) return history.push('/');

      conversation = {
        _id: this.props.match.params.conversationId,
        messages: [],
        unseenMessages: 0,
        updatedAt: new Date(),
        targets: [ target ]
      };
    }
    this.setState({conversation: conversation})
  }

  render(){
    return (
      <React.Fragment>
        {this.state.conversation ? <React.Fragment>
        <Container className={this.props.classes.h100}>
          <Grid container spacing={2} className={this.props.classes.h100}>
            <Grid item xs={4} className={this.props.classes.h100}>
              <Paper elevation={3} className={this.props.classes.h100}>
                <ChatMessages conversation={this.state.conversation}/>
              </Paper>
            </Grid>
            
            <Grid item xs={4} className={this.props.classes.h100}>
              <Paper elevation={3} className={this.props.classes.h100}>
                <ChatAttendees attendees={this.props.users.filter(user => this.state.conversation?.targets.includes(user._id))}/>
              </Paper>
            </Grid>
          </Grid>
        </Container>
        </React.Fragment> : null}
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(ChatPage));
