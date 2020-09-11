import * as React from 'react';
import { IUser } from '../User.interface';
import UsersListItem from './UsersListItem';
import { getUsers } from '../../Api/UserApi';
import { List, ListItem, Button } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Link } from 'react-router-dom';

interface UsersListState {
  users: IUser[]
}

class UsersList extends React.Component<{}, UsersListState>{
  constructor(props: {}) {
    super(props)
    this.state = {
      users: []
    }
  }

  componentDidMount(){
    // Load 4 first users
    getUsers(0,4).then(fetchedUsers => { this.setState({users: fetchedUsers})})
  }

  render(){
    return <div>
      <div>
        <Button variant="contained"><Link to="/login">LogIn</Link></Button>
      </div>
      <h1>Users</h1>
      <List>
        {this.state.users.map((user, index) => {
          return <ListItem key={index}>
              <UsersListItem firstname={user.firstname} lastname={user.lastname}/>
            </ListItem>
        })}
      </List>
      <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
        <Button>Prev</Button>
        <Button>Next</Button>
        <Button>Three</Button>
      </ButtonGroup>
    </div>
  }
}

export default UsersList;