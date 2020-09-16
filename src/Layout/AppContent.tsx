import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginPage from '../Login/components/LoginPage';
import ProfilePage from '../Profile/components/ProfilePage';
import ChatPage from '../Chat/components/ChatPage';
import { IConversation } from '../Conversations/types';
import { IUser } from '../Users/User.interface';
import UsersPage from '../Users/components/UsersPage';

interface AppContentProps {
  conversations: IConversation[];
  users: IUser[];
  sendMessage: (conversationId: string, emitter: string, targets: string[], content: string) => void
}

class AppContent extends React.Component<AppContentProps> {

  render(){
    return (
      <Switch>
        <Route path="/chats/:conversationId" component={() => <ChatPage conversations={this.props.conversations} users={this.props.users} sendMessage={this.props.sendMessage}/>}></Route>
        <Route path="/profiles/me"><ProfilePage /></Route>
        <Route path="/profiles" component={UsersPage}></Route>
        <Route path="/login"><LoginPage></LoginPage></Route>
        <Route path="/" component={LoginPage} />
      </Switch>
    )
  }
};

export default AppContent;