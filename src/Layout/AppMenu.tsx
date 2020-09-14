import * as React from 'react';
import { AppBar, Grid, Toolbar, Typography } from '@material-ui/core';
import { Forum } from '@material-ui/icons';
import { ProfileButton } from './ProfileButton';
import { IDrawerContent } from './types';

interface AppMenuProps {
  changeDrawerContent: (content: IDrawerContent) => void;
}

export function AppMenu({ changeDrawerContent } : AppMenuProps){
  return (
    <React.Fragment>
      <AppBar position="static" style={{ height: '5vh' }}>
        <Grid container justify="space-between" alignItems="center" style={{ height: '100%' }}>
          <Grid item>
            <Toolbar>
              <Forum fontSize="large" />
              <Typography variant="h3">flint.</Typography>
            </Toolbar>
          </Grid>
          <Grid item>
            <Toolbar>
              <h1>Nom de l'utilisateur</h1>
            </Toolbar>
          </Grid>
          <Grid item>
            <Toolbar>
              <button onClick={() => changeDrawerContent('contacts')}>Users</button>
              <button onClick={() => changeDrawerContent('conversations')}>Messages</button>
              <ProfileButton />
            </Toolbar>
          </Grid>
        </Grid>
      </AppBar>
    </React.Fragment>
  );
}

export default AppMenu;