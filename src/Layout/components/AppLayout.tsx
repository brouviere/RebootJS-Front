import * as React from 'react';
import AppContent from './AppContent';
import { withStyles, Theme, createStyles } from '@material-ui/core';
import AppDrawer, {drawerWidth} from './AppDrawer';
import AppMenu  from './AppMenu';
import { getConversations } from '../../Api/ConversationsApi';
import { IConversation } from '../../Conversations/types';
import { getConnectedUser, getUsers } from '../../Api/UserApi';
import { IUser } from '../../Users/User.interface';
import { connect } from 'react-redux';
import { IAppState } from '../../appReducer';
import { updateConnectedUser } from '../../Users/actions/updateConnectedUser';
import { setAllUsers } from '../../Users/actions/setAllUsers';

interface AppLayoutProps {
  user?: IUser;
  users: IUser[];
  classes: any;
  showDrawer: boolean;
  updateIdentity: (user: IUser) => void;
  setAllUsers: (users: IUser[]) => void;
}

interface AppLayoutState {
  conversations: IConversation[];
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
      conversations: [],
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
      .then(users => {
        if(users.length > 0) {
          this.props.setAllUsers(users);
        }
      })
      .catch(error => console.error(error))

    try {
      const connectedUser = await getConnectedUser();
      this.props.updateIdentity(connectedUser);
      await this.fetchConversations(connectedUser);
    } catch (error) {
      console.error(error)
    }

    this.setState({ polling: setInterval(() => {
      try {
        this.fetchConversations(this.props.user)
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
    const { classes, showDrawer, user } = this.props;
    const filteredClasses = [classes.content, showDrawer && classes.contentShift].filter(Boolean).join(' ');
    
    return <React.Fragment>
        <div className={filteredClasses}>
          <AppMenu />
          <AppContent
            conversations={this.state.conversations}
            users={this.props.users}
            connectedUser={user}
          />
        </div>
        <AppDrawer
          showDrawer={showDrawer}
          users={this.props.users}
          conversations={this.state.conversations}
          connectedUser={user}
        />
          
      </React.Fragment>
  }

}

const mapStateToProps = ({ user, layout } : IAppState) => ({
  user: user.connectedUser,
  users: user.users,
  showDrawer: layout.showDrawer
})

const mapDispatchToProps = (dispatch: any) => ({
  updateIdentity: (user: IUser) => dispatch(updateConnectedUser(user)),
  setAllUsers: (users: IUser[]) => dispatch(setAllUsers(users))
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AppLayout));