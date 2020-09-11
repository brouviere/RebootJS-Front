import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
// import UsersList from '../Users/Components/UsersList';
import LoginPage from '../Login/components/LoginPage';
import UsersList from '../Users/Components/UsersList';

class AppContent extends React.Component {

  render(){
    return (
      <Switch>
        <Route path="/profiles"><UsersList /></Route>
        <Route path="/login"><LoginPage></LoginPage></Route>
        <Route path="/" component={LoginPage} />
      </Switch>
    )
  }
};

export default AppContent;