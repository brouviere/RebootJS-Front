import * as React from 'react';
import UsersList from './UsersList';
import { ButtonGroup, Button } from '@material-ui/core';

interface UsersListState {
  skip: number;
  limit: number;
}

class UsersPage extends React.Component<{}, UsersListState> {
  constructor(props: UsersListState){
    super(props);
    this.state = {
      skip: 0,
      limit: 4
    }
  }

  componentDidMount(){
  }

  render(){
    return <React.Fragment>
      <h1>Users</h1>

      <UsersList params={{skip: this.state.skip, limit: this.state.limit}}/>

      <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
        <Button>Prev</Button>
        <Button>Next</Button>
      </ButtonGroup>
    </React.Fragment>
  }
}

export default UsersPage;