import * as React from 'react';
import { IUser } from '../../Users/User.interface';

interface IProfileDetailsProps {
  user?: IUser;
}

class ProfileDetails extends React.Component<IProfileDetailsProps> {

  render(){
    const { user } = this.props;
    return (
      user ? <React.Fragment>
          <h2>{user.firstname} {user.lastname}</h2>
          <h3>{user.email}</h3>
        </React.Fragment>
        : <React.Fragment><h2>naaaah :(</h2></React.Fragment>
    )
  }
}

export default ProfileDetails;