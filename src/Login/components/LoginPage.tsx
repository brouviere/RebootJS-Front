import * as React from 'react';
import { Tabs, Tab, Container } from '@material-ui/core';
import LoginTabPanel from './LoginTabPanel';
import LoginForm from './LoginForm';
import RegistrationForm from '../../Registration/components/RegistrationForm'

interface LoginPageState {
  tab: number;
}


class LoginPage extends React.Component<{}, LoginPageState>{
  constructor(props: {}) {
    super(props);
    this.state= { tab: 0 };
  }
  render(){
    return (
      <Container>
        <Tabs 
          indicatorColor='primary'
          textColor='primary'
          variant='fullWidth'
          value={this.state.tab} 
          onChange={(_oldTab, newTab) => {
          this.setState({tab: newTab});
        }}>
          <Tab label="login"/>
          <Tab label="register"/>
        </Tabs>
        <LoginTabPanel valueTab={this.state.tab} index={0}>
          <LoginForm />
        </LoginTabPanel>

        <LoginTabPanel valueTab={this.state.tab} index={1}>
          <RegistrationForm />
        </LoginTabPanel>
      </Container>
    )
  }

}

export default LoginPage;