import * as React from 'react';
import { getUsers } from '../../Api/UserApi';
import { IUser } from '../User.interface';
import UsersList from './UsersList';
import { ButtonGroup, Button } from '@material-ui/core';

interface UsersListState {
  users: IUser[]
}

class UsersPage extends React.Component<{}, UsersListState> {
  constructor(props: UsersListState){
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount(){
    // Load 4 first users
    getUsers(0,4).then(fetchedUsers => { this.setState({users: fetchedUsers})})
  }

  render(){
    return <React.Fragment>
      <h1>Users</h1>

      <UsersList usersList={this.state.users}/>

      <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
        <Button>Prev</Button>
        <Button>Next</Button>
      </ButtonGroup>
    </React.Fragment>
  }
}

export default UsersPage;