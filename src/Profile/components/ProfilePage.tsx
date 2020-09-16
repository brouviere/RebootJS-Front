import * as React from 'react';
import { IProfileFormFields } from '../../Utils/Types';
import { IUser } from '../../Users/User.interface';
import ProfileDetails from './ProfileDetails';

export interface IProfileFormState {
  status: 'ready' | 'success' | 'error';
  fields: IProfileFormFields;
  profile?: IUser;
}

class ProfilePage extends React.Component {

  render(){
    return (
      <React.Fragment>
        <h1>Profile Page</h1>
        <ProfileDetails />
      </React.Fragment>
    )
  }
}

export default ProfilePage;