import * as React from 'react';
import AppContent from './AppContent';
import { withStyles, Theme, createStyles } from '@material-ui/core';
import AppDrawer, {drawerWidth} from './AppDrawer';
import { AppMenu } from './AppMenu';
import { getConversations } from '../../Api/ConversationsApi';
import { IConversation } from '../../Conversations/types';
import { getConnectedUser, getUsers } from '../../Api/UserApi';
import { IUser } from '../../Users/User.interface';
import { connect } from 'react-redux';
import { IAppState } from '../../appReducer';

interface AppLayoutProps {
  classes: any;
  showDrawer: boolean;
}

interface AppLayoutState {
  conversations: IConversation[];
  users: IUser[];
  polling?: NodeJS.Timeout;
  connectedUser?: IUser;
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
      conversations: [],
      users: [],
    }
  }

  // changeDrawerContent = (content: IDrawerContent) => {
  //   this.setState({ drawerContent: content});
  // }

  // changeShowDrawer = () => {
  //   this.setState({ showDrawer: !this.state.showDrawer });
  // }

  // hideDrawer = () => {
  //   this.setState({showDrawer: false});
  // }

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
    const { classes, showDrawer } = this.props;
    const filteredClasses = [classes.content, showDrawer && classes.contentShift].filter(Boolean).join(' ');
    
    return <React.Fragment>
        <div className={filteredClasses}>
          <AppMenu/>
          <AppContent
            conversations={this.state.conversations}
            users={this.state.users}
            connectedUser={this.state.connectedUser}
          />
        </div>
        <AppDrawer
          users={this.state.users}
          conversations={this.state.conversations}
          connectedUser={this.state.connectedUser}
        />
          
      </React.Fragment>
  }

}

const mapStateToProps = ({ layout } : IAppState) => ({
  showDrawer: layout.showDrawer
})
export default connect(mapStateToProps)(withStyles(styles)(AppLayout));