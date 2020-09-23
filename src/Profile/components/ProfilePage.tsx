import * as React from 'react';
import { IUser } from '../../Users/User.interface';
import ProfileDetails from './ProfileDetails';
import { IAppState } from '../../appReducer';
import { connect } from 'react-redux';

import { match } from 'react-router-dom';


interface IProfilePageProps {
  users: IUser[];
  match: match<{userId: string }>;
}

class ProfilePage extends React.Component<IProfilePageProps> {

  render(){
    const {users, match} = this.props;
    const userId = match.params.userId;
    const user = users.find(user => user._id === userId);

    return (
      <React.Fragment>
        <h1>{user?.firstname} {user?.lastname}</h1>
        <ProfileDetails user={user} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ user }: IAppState) => ({
  users: user.users
})

export default connect(mapStateToProps)(ProfilePage);