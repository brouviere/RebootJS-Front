import * as React from 'react';
import { IUser } from '../User.interface';
import { ListItem, List } from '@material-ui/core';
import UsersListItem from './UsersListItem';

interface UsersListProps {
  usersList: IUser[]
}

class UsersList extends React.Component<UsersListProps>{

  render(){
    return <React.Fragment>
      <List>
        {this.props.usersList.map((user, index) => {
          return <ListItem key={index}>
              <UsersListItem firstname={user.firstname} lastname={user.lastname}/>
            </ListItem>
        })}
      </List>
    </React.Fragment>
  }
}

export default UsersList;