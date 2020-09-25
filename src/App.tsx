import React from 'react';
import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { Router } from 'react-router-dom';
import history from './history';
import AppLayout from './Layout/components/AppLayout';
import { Provider } from 'react-redux';
import { store } from './store';

const theme = createMuiTheme({
  
  palette: {
    type: 'dark',
    primary: {
      light: '#B2EBF2',
      main: '#00BCD4',
      dark: '#0097A7',
      contrastText: '#fff',
    },
    secondary: {
      light: '#d1ff33',
      main: '#c6ff00',
      dark: '#8ab200',
      contrastText: '#000',
    },
  },
})

function App() {
  return (
    <div className="my-app">
      <Provider store={store}>
        <Router history={history} >
          <ThemeProvider theme={theme}>
            
              <AppLayout />
            
          </ThemeProvider>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
