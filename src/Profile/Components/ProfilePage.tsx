import * as React from 'react';
import ProfileDetails from './ProfileDetails';

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