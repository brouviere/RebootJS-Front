import * as React from 'react';
import { Typography } from '@material-ui/core';

interface UsersListItemProps {
  firstname: string;
  lastname: string;
}

class UsersListItem extends React.Component<UsersListItemProps> {

  render(){
    return <Typography>{this.props.firstname} {this.props.lastname}</Typography>
  }
}

export default UsersListItem;