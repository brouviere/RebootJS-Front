import * as React from 'react';
import { Cookies, withCookies } from 'react-cookie';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import history from '../../history';
import { IconButton } from '@material-ui/core';

interface LogoutProps {
  cookies: Cookies
}

class Logout extends React.Component<LogoutProps> {

  logout = () => {
    const { cookies } = this.props;
    cookies.remove('session_id');
    history.push('/');
  }

  render() {
    return(
      <IconButton color='default' aria-label="logout">
        <ExitToAppIcon fontSize="large" onClick={this.logout}/>
      </IconButton>
      
    )
  }
    
}

export default withCookies(Logout);