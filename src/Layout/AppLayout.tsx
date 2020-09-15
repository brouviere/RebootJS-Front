import * as React from 'react';
import AppContent from './AppContent';
import { withStyles, Theme, createStyles } from '@material-ui/core';
import AppDrawer, {drawerWidth} from './AppDrawer';
import { AppMenu } from './AppMenu';
import { IDrawerContent } from './types';
import { getConversations } from '../Api/ConversationsApi';
import { IConversation, IConversationMessage } from '../Conversations/types';
import { getUsers } from '../Api/UserApi';
import { IUser } from '../Users/User.interface';

interface AppLayoutProps {
  classes: any;
}

interface AppLayoutState {
  showDrawer: boolean;
  drawerContent?: IDrawerContent;
  conversations: IConversation[];
  users: IUser[];
}

const styles = (theme: Theme) => createStyles({
  content: {
    width: '100vw',
    height: '100vh',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.standard
    })
  },
  contentShift: {
    width: `calc(100vw - ${drawerWidth})`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.standard
    })
  },
  drawer: {
    width: drawerWidth
  }
});

class AppLayout extends React.Component<AppLayoutProps, AppLayoutState>{
  constructor(props: AppLayoutProps){
    super(props);
    this.state = {
      showDrawer: false,
      conversations: [],
      users: []
    }
  }

  changeDrawerContent = (content: IDrawerContent) => {
    this.setState({ drawerContent: content});
  }

  show = () => {
    this.setState({ showDrawer: !this.state.showDrawer });
  }

  hideDrawer = () => {
    this.setState({showDrawer: false});
  }

  componentDidMount(){
    getConversations().then(conversations => {
      this.setState({conversations: conversations})
    });

    getUsers(0,100).then(users => {
      this.setState({users: users});
    })
    console.log('didMount', this.state);
  }

  sendMessage = (conversationId: string, emitter: string, targets: string[], content: string) => {
    console.log('Message sent to back end', content, conversationId, emitter, targets) ;
    const conversation = this.state.conversations.find(conv => conv._id === conversationId);
    
    if(conversation){
      const newMessage: IConversationMessage = {
        _id: '',
        conversationId: conversation._id,
        createdAt: new Date().toString(),
        emitter: emitter,
        targets: targets,
        content: content
      };
      conversation.messages.push(newMessage);

      this.setState({
        conversations: [...this.state.conversations, conversation]
      });
    }
    
  }

  render(){
    const { classes } = this.props;
    const filteredClasses = [classes.content, this.state.showDrawer && classes.contentShift].filter(Boolean).join(' ');
    
    return <React.Fragment>
        <div className={filteredClasses}>
          <AppMenu show={this.show} showDrawer={this.state.showDrawer}/>
          <AppContent conversations={this.state.conversations} users={this.state.users} sendMessage={this.sendMessage}/>
        </div>
        <AppDrawer 
          drawerContent={this.state.drawerContent}
          showDrawer={this.state.showDrawer}
          hideDrawer={this.hideDrawer}
          changeDrawerContent={this.changeDrawerContent}/>
          
      </React.Fragment>
  }

}

export default withStyles(styles)(AppLayout);