import { Box, Button, Container, Grid } from '@material-ui/core';
import React from 'react';
import history from '../../history';
import { Alert } from '@material-ui/lab';

import { validateEmailField } from '../utils/validateEmailField';
import { register } from '../../Api/UserApi';
import IdentitySection from './IdentityForm';
import { defaultFormField, IProfileFormFields, defaultPasswordField } from '../../Utils/Types';
import CredentialsSection from './CredentialsForm';
import { validateRequiredField } from '../../Utils/ValidateRequiredField';
import PasswordChecks from './PasswordChecks';
import { validatePasswordField } from '../utils/validatePasswordField';
// import ProfileFormCheck from './RegistrationFormChecks';

export interface IRegistrationFormState {
  status: 'ready' | 'success' | 'error';
  fields: IProfileFormFields;
}

class RegistrationForm extends React.Component<{}, IRegistrationFormState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      status: 'ready',
      fields: {
        email: defaultFormField(),
        firstname: defaultFormField(),
        lastname: defaultFormField(),
        password: defaultPasswordField(),
        confirmation: defaultFormField(),
      }
    }
  };

  saveProfile = (): void => {
    const { email, firstname, lastname, password } = this.state.fields;
    register(email.value, password.value, firstname.value, lastname.value)
      .then(_profile => history.push(`profiles/me`))
      .catch(_error => this.setState({ status: 'error'}));
  }


  changeField = (field: 'email' | 'firstname' | 'lastname' | 'password' | 'confirmation'): ((value: string) => void) => {
    return (value: string) => {
      const newState = {
        fields: {
          ...this.state.fields,
          [field]: { value: value }
        }
      };

      // checking fiels conditions
      switch(field){
        case 'email':
          const { email } = newState.fields;
          validateEmailField(email);
          break;
        case 'firstname':
          const { firstname } = newState.fields;
          validateRequiredField(firstname.value);
          break;
        case 'lastname':
          const { lastname } = newState.fields;
          validateRequiredField(lastname.value);
          break;
        case 'password' || 'confirmation':
          const { password, confirmation } = newState.fields;
          validatePasswordField(password, confirmation);
          break;
      }
      this.setState(newState);
    }
  }

  render() {
    const { email, firstname, lastname, password, confirmation } = this.state.fields;
    const { status } = this.state
    return (
      <Container>
        <Box style={{ margin: '2rem 0' }}>
          {status !== 'ready' ?
          <Alert severity={status}>
            {status === 'success' ? 'Utilisateur créé' : 'Problème lors de la création'}
          </Alert> : null }
        </Box>
        <form onSubmit={(e) => { e.preventDefault(); this.saveProfile() }}>
          <Box style={{ margin: '2rem 0' }}>
            <Grid container justify="space-evenly" alignItems="flex-start">
              <Grid item xs={4}>
                <IdentitySection
                  email={email}
                  firstname={firstname}
                  lastname={lastname}
                  changeEmail={this.changeField("email")}
                  changeFirstname={this.changeField("firstname")}
                  changeLastname={this.changeField("lastname")}
                />
              </Grid>
              <Grid item xs={4}>
                <CredentialsSection
                  password={password}
                  confirmation={confirmation}
                  changePassword={this.changeField("password")}
                  changeConfirmation={this.changeField("confirmation")}
                />
                {/* <ProfileFormCheck check={email.isValid} /> */}
                <PasswordChecks password={password} />
              </Grid>
            </Grid>
          </Box>
          <Box style={{ margin: '2rem 0' }}>
            <Grid container justify="flex-end">
              <Grid item xs={2}>
                <Button
                  variant="contained" 
                  color="primary" 
                  fullWidth={true} 
                  type="submit"
                >
                  Register
              </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Container>
    );
  }
}

export default RegistrationForm;