import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { IAppState } from './appReducer';
import { makeInitApp } from './Layout/actions/makeInitApp';
import { store } from './store';

(store.dispatch as ThunkDispatch<IAppState, void, Action>)(makeInitApp());

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
