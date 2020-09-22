import * as React from 'react';
import { IProfileFormFields } from '../../Utils/Types';
import { IUser } from '../../Users/User.interface';
import ProfileDetails from './ProfileDetails';
import { IAppState } from '../../appReducer';
import { connect } from 'react-redux';


interface IMyProfilePageProps {
  connectedUser?: IUser;
}

export interface IMyProfileFormState {
  status: 'ready' | 'success' | 'error';
  fields: IProfileFormFields;
}

class MyProfilePage extends React.Component<IMyProfilePageProps> {

  render(){
    return (
      <React.Fragment>
        <h1>My Profile</h1>
        <ProfileDetails user={this.props.connectedUser} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ user }: IAppState) => ({
  connectedUser: user.connectedUser
})

export default connect(mapStateToProps)(MyProfilePage);