import * as React from 'react';
import { Theme, createStyles, Drawer, Box, withStyles, IconButton, Grid, Toolbar } from '@material-ui/core';
import { IDrawerContent } from '../types';
import UsersList from '../../Users/components/UsersList';
import { connect } from 'react-redux';
import { IUser } from '../../Users/User.interface';
import GroupIcon from '@material-ui/icons/Group';
import { Forum } from '@material-ui/icons';
import ConversationsList from '../../Conversations/components/ConversationsList';
import { IAppState } from '../../appReducer';
import { changeDrawerContent } from '../actions/changeDrawerContentAction';

interface AppDrawerProps {
  showDrawer: boolean;
  drawerContent?: IDrawerContent;
  changeDrawerContent: (content: IDrawerContent) => void;
  classes: any;
  users: IUser[];
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
    const { changeDrawerContent } = this.props;
    const content = this.props.drawerContent === 'contacts' ? 
      <UsersList />
      : <ConversationsList/>
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

const mapStateToProps = ({ user, layout }: IAppState) => ({
  drawerContent: layout.drawerContent,
  connectedUser: user.connectedUser,
  users: user.users
})

const mapDispatchToProps = (dispatch: any) => ({
  changeDrawerContent: (content: IDrawerContent) => dispatch(changeDrawerContent(content,true))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AppDrawer));
export const drawerWidth = '25vw';