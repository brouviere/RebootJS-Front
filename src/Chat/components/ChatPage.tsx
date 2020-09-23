import * as React from 'react';
import ChatMessages from './ChatMessages';
import ChatAttendees from './ChatAttendees';
import { IConversation } from '../../Conversations/types';
import { match, withRouter } from 'react-router-dom';
import { IUser } from '../../Users/User.interface';
import history from '../../history';
import { Grid, Container, Paper, Theme, createStyles, withStyles } from '@material-ui/core';
import { IAppState } from '../../appReducer';
import { connect } from 'react-redux';

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
    const conversations = this.props.conversations;
    const conversationId = this.props.match.params.conversationId;

    let conversation = conversations.find(conv => conv._id === conversationId);
    if(!conversation) {
      const target = new URLSearchParams(this.props.location.search).get('target');
      if(!target) return history.push('/');

      conversation = {
        _id: conversationId,
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
                <ChatMessages conversation={this.state.conversation} users={this.props.users}/>
              </Paper>
            </Grid>
            
            <Grid item xs={4} className={this.props.classes.h100}>
              <Paper elevation={3} className={this.props.classes.h100}>
                <ChatAttendees />
              </Paper>
            </Grid>
          </Grid>
        </Container>
        </React.Fragment> : null}
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ user, conversation } : IAppState) => ({
  users: user.users,
  conversations: conversation.conversations
})

export default connect(mapStateToProps)(withRouter(withStyles(styles)(ChatPage)));
