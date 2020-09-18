import * as React from 'react';
import { AppBar, Grid, Toolbar, Typography, IconButton } from '@material-ui/core';
import { Forum, Menu } from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import { ProfileButton } from './ProfileButton';

interface AppMenuProps {
  showDrawer: boolean;
  show : () => void;
}

export function AppMenu({ show, showDrawer } : AppMenuProps){
  return (
    <React.Fragment>
      <AppBar position="static" style={{ height: '5vh' }}>
        <Grid container justify="space-between" alignItems="center" style={{ height: '100%' }}>
          <Grid item >
            <Toolbar>
              <IconButton onClick={() => show()}>
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
          <Grid item>
            <Toolbar>
              <ProfileButton />
            </Toolbar>
          </Grid>
        </Grid>
      </AppBar>
    </React.Fragment>
  );
}

export default AppMenu;