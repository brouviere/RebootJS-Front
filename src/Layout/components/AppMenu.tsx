import * as React from 'react';
import { AppBar, Grid, Toolbar, Typography, IconButton } from '@material-ui/core';
import { Forum, Menu } from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import { ProfileButton } from './ProfileButton';
import { IUser } from '../../Users/User.interface';
import { IAppState } from '../../appReducer';
import { connect } from 'react-redux';
import { changeDrawerContent } from '../actions/changeDrawerContentAction';
import { IDrawerContent } from '../types';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { Link } from 'react-router-dom';

interface AppMenuProps {
  user?: IUser;
  showDrawer?: boolean;
  displayDrawer: () => void;
}

export function AppMenu({ showDrawer, displayDrawer,  user } : AppMenuProps){
  console.log('AppMenu User', user);
  return (
    <React.Fragment>
      <AppBar position="static" style={{ height: '5vh' }}>
        <Grid container justify="space-between" alignItems="center" style={{ height: '100%' }}>
          <Grid item >
            <Toolbar>
              <IconButton onClick={() => displayDrawer()}>
                <Menu />
                {showDrawer ? <CloseIcon /> : <Menu />}
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

const mapStateToProps = ({ user, layout }: IAppState) => ({
  user: user.connectedUser,
  showDrawer: layout.showDrawer
});

const mapDispatchToProps = (dispatch: any) => ({
  // changeDrawerContent: () => dispatch(changeDrawerContent(undefined, false)),
  displayDrawer: () => dispatch(changeDrawerContent(undefined, true))
})

export default connect(mapStateToProps, mapDispatchToProps)(AppMenu);