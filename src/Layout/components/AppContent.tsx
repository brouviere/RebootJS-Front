import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginPage from '../../Login/components/LoginPage';
import MyProfilePage from '../../Profile/components/MyProfilePage';
import ChatPage from '../../Chat/components/ChatPage';
import { IConversation } from '../../Conversations/types';
import { IUser } from '../../Users/User.interface';
import UsersPage from '../../Users/components/UsersPage';
import ProfilePage from '../../Profile/components/ProfilePage';

interface AppContentProps {
  conversations: IConversation[];
  connectedUser?: IUser;
}

class AppContent extends React.Component<AppContentProps> {

  render(){
    return (
      <Switch>
        <Route path="/chats/:conversationId" component={
          () => <ChatPage
            conversations={this.props.conversations}
            />}/>
        <Route path="/profiles/me" component={() => <MyProfilePage />}/>
        <Route path="/profiles/:userId" component={ProfilePage}></Route>
        <Route path="/profiles" component={UsersPage}></Route>
        <Route path="/login"><LoginPage></LoginPage></Route>
        <Route path="/" component={LoginPage} />
      </Switch>
    )
  }
};

export default AppContent;