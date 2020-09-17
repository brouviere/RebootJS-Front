import * as React from 'react';
import AppContent from './AppContent';
import { withStyles, Theme, createStyles } from '@material-ui/core';
import AppDrawer, {drawerWidth} from './AppDrawer';
import { AppMenu } from './AppMenu';
import { IDrawerContent } from './types';
import { getConversations } from '../Api/ConversationsApi';
import { IConversation } from '../Conversations/types';
import { getConnectedUser, getUsers } from '../Api/UserApi';
import { IUser } from '../Users/User.interface';

interface AppLayoutProps {
  classes: any;
}

interface AppLayoutState {
  showDrawer: boolean;
  drawerContent?: IDrawerContent;
  conversations: IConversation[];
  users: IUser[];
  connectedUser?: IUser;
  polling?: NodeJS.Timeout;
}

const styles = (theme: Theme) => createStyles({
  content: {
    width: '100vw',
    height: '100%',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  contentShift: {
    width: `calc(100vw - ${drawerWidth})`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.leavingScreen
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
      users: [],
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

  fetchConversations = async (user?: IUser) => {
    if(!user) return;
    const conversations = await getConversations(user);
    this.setState({ conversations })
  }

  async componentDidMount(){

    getUsers(0,100)
      .then(users => { this.setState({users: users}) })
      .catch(error => console.error(error))

    try {
      const connectedUser = await getConnectedUser();
      this.setState({ connectedUser });
      await this.fetchConversations(connectedUser);
    } catch (error) {
      console.error(error)
    }

    this.setState({ polling: setInterval(() => {
      try {
        this.fetchConversations(this.state.connectedUser)
      } catch (error) {
        console.error(error)
      }
    }, 100000)})
  }

  componentWillUnmount(){
    const { polling } = this.state;
    if(polling) clearInterval(polling);
  }

  render(){
    const { classes } = this.props;
    const filteredClasses = [classes.content, this.state.showDrawer && classes.contentShift].filter(Boolean).join(' ');
    
    return <React.Fragment>
        <div className={filteredClasses}>
          <AppMenu show={this.show} showDrawer={this.state.showDrawer}/>
          <AppContent
            conversations={this.state.conversations}
            users={this.state.users}
            connectedUser={this.state.connectedUser}
          />
        </div>
        <AppDrawer 
          drawerContent={this.state.drawerContent}
          showDrawer={this.state.showDrawer}
          hideDrawer={this.hideDrawer}
          changeDrawerContent={this.changeDrawerContent}
          conversations={this.state.conversations}
          connectedUser={this.state.connectedUser}
        />
          
      </React.Fragment>
  }

}

export default withStyles(styles)(AppLayout);