import * as React from 'react';
import { Theme, createStyles, Drawer, Box, withStyles } from '@material-ui/core';
import { IDrawerContent } from './types';
import UsersList from '../Users/components/UsersList';
import { getUsers } from '../Api/UserApi';
import { IUser } from '../Users/User.interface';

interface AppDrawerProps {
  showDrawer: boolean;
  drawerContent?: IDrawerContent;
  hideDrawer: () => void;
  classes: any;
}

interface AppDrawerState {
  usersList: IUser[];
}

const styles = (theme: Theme) => createStyles({
  drawerHeader: {
    height: '5vh',
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

  componentDidMount(){
    // Load 10 first users
    getUsers(0,10).then(fetchedUsers => { this.setState({usersList: fetchedUsers})})
  }

  render(){
    const content = this.props.drawerContent === 'contacts' ? <UsersList usersList={this.state.usersList}/> : <h1>Coming soon...</h1>;
    return this.props.showDrawer ?
    <Drawer
      variant="persistent"
      anchor="left"
      open={this.props.showDrawer}
      classes={{
        paper: this.props.classes.paper,
     }}>
      <Box className={this.props.classes.drawerHeader}>
        <button onClick={this.props.hideDrawer}>Close</button>
      </Box>
      <Box className={this.props.classes.drawerContent}>
        {content}
      </Box>
    </Drawer> : null;
    }
}

export default withStyles(styles)(AppDrawer);
export const drawerWidth = '40vw';