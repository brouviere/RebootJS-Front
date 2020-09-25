import * as React from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import history from '../../history';
import { IconButton } from '@material-ui/core';

interface LogoutProps {
}

class Logout extends React.Component<LogoutProps> {

  logout = () => {
    history.push('/');
  }

  render() {
    return(
      <IconButton color='default' aria-label="logout" onClick={this.logout}>
        <ExitToAppIcon fontSize="large" />
      </IconButton>
      
    )
  }
    
}

export default Logout;