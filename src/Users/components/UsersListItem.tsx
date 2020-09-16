import * as React from 'react';
import { ListItemText } from '@material-ui/core';

interface UsersListItemProps {
  firstname: string;
  lastname: string;
}

class UsersListItem extends React.Component<UsersListItemProps> {

  render(){
    return <ListItemText>Name: {this.props.firstname} {this.props.lastname}</ListItemText>
  }
}

export default UsersListItem;