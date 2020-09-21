import * as React from 'react';
import { AppBar, Grid, Toolbar, Typography, IconButton } from '@material-ui/core';
import { Forum, Menu } from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import { ProfileButton } from './ProfileButton';
import { IUser } from '../../Users/User.interface';
import { IAppState } from '../../appReducer';
import { connect } from 'react-redux';
import { changeDrawerContent } from '../actions/changeDrawerContentAction';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { Link } from 'react-router-dom';

interface AppMenuProps {
  user?: IUser;
  showDrawer?: boolean;
  toggleDrawer: (showDrawer: boolean) => void;
}

class AppMenu extends React.Component<AppMenuProps> {
  render() {
    const {toggleDrawer, showDrawer, user} =this.props
    return (
    <React.Fragment>
      <AppBar position="static" style={{ height: '70px' }}>
        <Grid container justify="space-between" alignItems="center" style={{ height: '100%' }}>
          <Grid item >
            <Toolbar>
              <IconButton onClick={() => toggleDrawer(!showDrawer)}>
                {showDrawer ? <CloseIcon/> : <Menu/>}
              </IconButton>
            </Toolbar>
          </Grid>
          <Grid item>
            <Toolbar>
              <Forum fontSize="large" />
              <Typography variant="h3">flint.</Typography>
            </Toolbar>
          </Grid>
          { user ? <Grid item>
            <Toolbar>
          <Typography variant="caption">{ user.firstname }</Typography>
        
              <ProfileButton />
            </Toolbar>
          </Grid> : <Toolbar><Link to="/login"><IconButton color='default' aria-label="login-button"><PowerSettingsNewIcon fontSize="large" /></IconButton></Link></Toolbar> }
        </Grid>
      </AppBar>
    </React.Fragment>
  );
  }
  
}

const mapStateToProps = ({ user, layout }: IAppState) => ({
  user: user.connectedUser,
  showDrawer: layout.showDrawer
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleDrawer: (showDrawer: boolean) => {
      const content = showDrawer ? 'conversations' : undefined;
      dispatch(changeDrawerContent(content, showDrawer))
    }
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(AppMenu);