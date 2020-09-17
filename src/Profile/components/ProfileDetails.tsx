import * as React from 'react';
import { IUser } from '../../Users/User.interface';

interface IProfileDetailsProps {
  connectedUser?: IUser;
}

class ProfileDetails extends React.Component<IProfileDetailsProps> {

  render(){
    const { connectedUser } = this.props;
    return (
      <h2>{connectedUser ? connectedUser.email : null}</h2>
    )
  }
}

export default ProfileDetails;