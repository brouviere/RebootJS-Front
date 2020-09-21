import * as React from 'react';
import { IUser } from '../User.interface';
import { ListItem, List } from '@material-ui/core';
import UsersListItem from './UsersListItem';
import history from '../../history';

interface UsersListProps {
  usersList: IUser[];
  connectedUser?: IUser;
}

class UsersList extends React.Component<UsersListProps>{

  createConversation = (target: string) => {
    const {connectedUser} = this.props;
    if (connectedUser) {
      const conversationId = this.buildConversationId(connectedUser._id, target);
      return history.push(`/chats/${conversationId}?target=${target}`);
    }
  }

  buildConversationId = (connectedUserId: string, target: string) : string => {
    return Buffer.from([connectedUserId, target, new Date().toISOString()].join('_')).toString('base64');
  }

  render(){
    return <React.Fragment>
      <List>
        {this.props.usersList.map((user, index) => {
          return <ListItem key={index} button onClick={(_event) => { this.createConversation(user._id) }}>
              <UsersListItem firstname={user.firstname} lastname={user.lastname}/>
            </ListItem>
        })}
      </List>
    </React.Fragment>
  }
}

export default UsersList;