import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginPage from '../Login/components/LoginPage';
import ProfilePage from '../Profile/components/ProfilePage';
import UsersPage from '../Users/components/UsersPage';

class AppContent extends React.Component {

  render(){
    return (
      <Switch>
        <Route path="/profiles/me"><ProfilePage /></Route>
        <Route path="/profiles"><UsersPage /></Route>
        <Route path="/login"><LoginPage></LoginPage></Route>
        <Route path="/" component={LoginPage} />
      </Switch>
    )
  }
};

export default AppContent;