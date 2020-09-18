import * as React from 'react';
import { Theme, createStyles, Drawer, Box, withStyles, IconButton, Grid, Toolbar } from '@material-ui/core';
import { IDrawerContent } from '../types';
import UsersList from '../../Users/components/UsersList';
import { getUsers } from '../../Api/UserApi';
import { IUser } from '../../Users/User.interface';
import GroupIcon from '@material-ui/icons/Group';
import { Forum } from '@material-ui/icons';
import ConversationsList from '../../Conversations/components/ConversationsList';
import { IConversation } from '../../Conversations/types';

interface AppDrawerProps {
  showDrawer: boolean;
  drawerContent?: IDrawerContent;
  hideDrawer: () => void;
  classes: any;
  changeDrawerContent: (content: IDrawerContent) => void;
  conversations: IConversation[];
  connectedUser?: IUser;
}

interface AppDrawerState {
  usersList: IUser[];
}

const styles = (theme: Theme) => createStyles({
  drawerHeader: {
    height: '70px',
    textAlign: 'right',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  paper: {
    width: drawerWidth
  },
  drawerContent: {
    height: 'calc(100vh - drawerHeader.height)'
  }
});

class AppDrawer extends React.Component<AppDrawerProps, AppDrawerState> {
  constructor(props: AppDrawerProps){
    super(props);
    this.state = {
      usersList: []
    }
  }

  componentDidMount(){
    // Load 100 first users
    getUsers(0,100).then(fetchedUsers => { this.setState({usersList: fetchedUsers})})
  }

  render(){
    const content = this.props.drawerContent === 'contacts' ? 
      <UsersList usersList={this.state.usersList} connectedUser={this.props.connectedUser}/>
      : <ConversationsList conversations={this.props.conversations} users={this.state.usersList} />;
    return this.props.showDrawer ?
    <Drawer
      variant="persistent"
      anchor="left"
      open={this.props.showDrawer}
      classes={{
        paper: this.props.classes.paper,
     }}>
      <Box className={this.props.classes.drawerHeader}>
        <Grid container justify="space-between" alignItems="center" style={{ height: '100%' }}>
          <Grid item >
            <Toolbar>
              <IconButton onClick={() => this.props.changeDrawerContent('contacts')}>
                <GroupIcon />
              </IconButton>
            </Toolbar>
          </Grid>
          <Grid item>
            <Toolbar>
            <IconButton onClick={() => this.props.changeDrawerContent('conversations')}>
                <Forum />
              </IconButton>
            </Toolbar>
          </Grid>
        </Grid>
      </Box>
      <Box className={this.props.classes.drawerContent}>
        {content}
      </Box>
    </Drawer> : null;
    }
}

export default withStyles(styles)(AppDrawer);
export const drawerWidth = '25vw';