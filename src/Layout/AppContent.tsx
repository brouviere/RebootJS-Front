import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import UsersList from '../Users/Components/UsersList';
import LoginPage from '../Login/components/LoginPage';

class AppContent extends React.Component {

  render(){
    return (
      <Switch>
        <Route path="/login"><LoginPage></LoginPage></Route>
        <Route path="/" component={UsersList} />
      </Switch>
    )
  }
};

export default AppContent;