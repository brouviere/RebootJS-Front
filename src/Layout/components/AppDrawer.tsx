import * as React from 'react';
import { Theme, createStyles, Drawer, Box, withStyles, IconButton, Grid, Toolbar } from '@material-ui/core';
import { IDrawerContent } from '../types';
import UsersList from '../../Users/components/UsersList';
import { connect } from 'react-redux';
import { IUser } from '../../Users/User.interface';
import GroupIcon from '@material-ui/icons/Group';
import { Forum } from '@material-ui/icons';
import ConversationsList from '../../Conversations/components/ConversationsList';
import { IConversation } from '../../Conversations/types';
import { IAppState } from '../../appReducer';
import { changeDrawerContent } from '../actions/changeDrawerContentAction';

interface AppDrawerProps {
  showDrawer: boolean;
  drawerContent?: IDrawerContent;
  changeDrawerContent: (content: IDrawerContent) => void;
  classes: any;
  users: IUser[];
  conversations: IConversation[];
  connectedUser?: IUser;
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

class AppDrawer extends React.Component<AppDrawerProps> {

  render(){
    const { users, changeDrawerContent } = this.props;
    const content = this.props.drawerContent === 'contacts' ? 
      <UsersList usersList={users} connectedUser={this.props.connectedUser}/>
      : <ConversationsList conversations={this.props.conversations} users={users} />
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
              <IconButton onClick={() => changeDrawerContent('contacts')}>
                <GroupIcon />
              </IconButton>
            </Toolbar>
          </Grid>
          <Grid item>
            <Toolbar>
            <IconButton onClick={() => changeDrawerContent('conversations')}>
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

const mapStateToProps = ({ layout }: IAppState) => ({
  showDrawer: layout.showDrawer,
  drawerContent: layout.drawerContent
})

const mapDispatchToProps = (dispatch: any) => ({
  changeDrawerContent: (content: IDrawerContent) => dispatch(changeDrawerContent(content))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AppDrawer));
export const drawerWidth = '25vw';