import { combineReducers } from 'redux';
import { user } from './Users/reducer';
import { layout } from './Layout/reducers';
import { conversation } from './Chat/reducer';

export const appReducer = combineReducers({
  user,
  layout,
  conversation
});

export type IAppState = ReturnType<typeof appReducer>;