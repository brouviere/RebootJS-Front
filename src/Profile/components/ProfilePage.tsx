import * as React from 'react';
import { IProfileFormFields } from '../../Utils/Types';
import { IUser } from '../../Users/User.interface';
import ProfileDetails from './ProfileDetails';


interface IProfileFormProps {
  connectedUser?: IUser;
}

export interface IProfileFormState {
  status: 'ready' | 'success' | 'error';
  fields: IProfileFormFields;
  profile?: IUser;
}

class ProfilePage extends React.Component<IProfileFormProps> {

  render(){
    return (
      <React.Fragment>
        <h1>{this.props.connectedUser?.firstname} {this.props.connectedUser?.lastname}</h1>
        <ProfileDetails connectedUser={this.props.connectedUser} />
      </React.Fragment>
    )
  }
}

export default ProfilePage;