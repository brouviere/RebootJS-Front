import * as React from 'react';
import AppContent from './AppContent';
import { withStyles, Theme, createStyles } from '@material-ui/core';
import AppDrawer, {drawerWidth} from './AppDrawer';
import AppMenu  from './AppMenu';
import { IUser } from '../../Users/User.interface';
import { connect } from 'react-redux';
import { IAppState } from '../../appReducer';
import { updateConnectedUser } from '../../Users/actions/updateConnectedUser';
import { makeFetchUsers } from '../../Users/actions/makeFetchUsers';
import { makeFetchConversations } from '../../Chat/actions/makeFetchConversations';

interface AppLayoutProps {
  user?: IUser;
  users: IUser[];
  classes: any;
  showDrawer: boolean;
  updateIdentity: (user: IUser) => void;
  makeFetchUsers: () => void;
  makeFetchConversations: () => void;
}

interface AppLayoutState {
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
    this.state = {}
  }

  componentDidMount(){
    this.props.makeFetchUsers();
    this.props.makeFetchConversations();
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
            connectedUser={user}
          />
        </div>
        <AppDrawer
          showDrawer={showDrawer}
          users={this.props.users}
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
  makeFetchUsers: () => dispatch(makeFetchUsers()),
  makeFetchConversations: () => dispatch(makeFetchConversations())
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AppLayout));