import * as React from 'react';
import { IFormField } from '../../Utils/Types';
import { TextField, Button, Container, Box, Grid } from '@material-ui/core';
import { login } from '../../Api/UserApi';
import history from '../../history';
import { validateRequiredField } from '../../Utils/ValidateRequiredField';
import { Alert } from '@material-ui/lab';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import BlockIcon from '@material-ui/icons/Block';

interface LoginFormState {
  email: IFormField;
  password: IFormField;
  status: 'ready' | 'success' | 'error';
}

class LoginForm extends React.Component<{}, LoginFormState> {
  constructor(props: {}){
    super(props)
    this.state= {
      email: {value: '', isValid: true},
      password: {value: '', isValid: true},
      status: 'ready'
    }
  }

  _submit = () => {
    login(this.state.email.value, this.state.password.value)
      .then((user) => {
        history.push('/profiles/me');
        localStorage.setItem('connectedUser', JSON.stringify(user));
      })
      .catch(_err => {this.setState({status: 'error'})});
  }

  render() {
    const { email, password, status } = this.state;
    return (
    <Container maxWidth='xs'>
      {status !== 'ready' ?
        <Alert severity={status}>
          {status === 'success' ? 'Utilisateur connecté' : 'Utilisateur inexistant'}
        </Alert> : null }
      <form onSubmit={(event) => { event.preventDefault(); this._submit() }}>
        <Box style={{ margin: '2rem 0'}}>
          <TextField
            label="Email"
            value={email.value}
            required={true}
            onChange={(event) => this.setState({
              email: {value: event.target.value, isValid: validateRequiredField(event.target.value)}
            })}
            onBlur={() => this.setState({
              email: {value: email.value, isValid: validateRequiredField(email.value)}
            })}
            fullWidth={true}
            style={{margin: '0.5rem 0'}}
            variant="outlined"
            {...( email.isValid ? {} : { error: true, helperText: "Ce champ est obligatoire" })}
          />
          <TextField
            type="password"
            label="Password"
            required={true}
            value={password.value}
            onChange={(event) => this.setState({
              password: {value: event.target.value, isValid: validateRequiredField(event.target.value)}
            })}
            onBlur={() => this.setState({
              password: {value: password.value, isValid: validateRequiredField(password.value)}
            })}
            fullWidth={true}
            variant="outlined"

            {...( password.isValid ? {} : { error: true, helperText: "Ce champ est obligatoire" })}
          />
        </Box>
        <Box style={{margin: '1rem 0'}}>
          <Grid container justify='flex-end'>
            <Grid item xs={4}>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={!email.value || !password.value}
                startIcon={(!email.value || !password.value) ? <BlockIcon color="error"/> : <DoneOutlineIcon />}
                fullWidth={true}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Container>
  )}

}

export default LoginForm;