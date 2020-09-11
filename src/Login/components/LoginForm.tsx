import * as React from 'react';
import { IFormField } from '../../Utils/Types';
import { TextField, Button } from '@material-ui/core';
import { login } from '../../Api/UserApi';
import history from '../../history';
import { validateRequiredField } from '../../Utils/ValidateRequiredField';

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
      .then((user) => history.push('/'))
      .catch(_err => {this.setState({status: 'error'})});
  }

  render() {
    return (
      // {this.state.status !== 'ready' ? <Alert severity={this.state.status}></Alert> : null}
      <div>
      <h2>Log In</h2>
      <form onSubmit={(event) => {
        event.preventDefault();
        this._submit();
      }}>
        <TextField 
          label="Email"
          required={true}
          value={this.state.email.value}
          variant="outlined"
          {...( this.state.email.isValid ? {} : {error: true, helperText: 'Ce champ est obligatoire'})}
          onChange={(event) => this.setState({
            ...this.state,
            email: {value: event.target.value, isValid: validateRequiredField(event.target.value)}})}
        />
        <TextField 
          label="Password"
          type="password"
          required={true}
          variant="outlined"
          {...( this.state.password.isValid ? {} : {error: true, helperText: 'Ce champ est obligatoire'})}
          value={this.state.password.value}
          onChange={(event) => this.setState({
            ...this.state,
            password: {value: event.target.value, isValid: validateRequiredField(event.target.value)}})}
        />
        <Button variant="contained" type="submit">Submit</Button>
      </form>
    </div>
    )
  }

}

export default LoginForm;