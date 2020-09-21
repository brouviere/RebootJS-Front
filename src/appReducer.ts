import { combineReducers } from 'redux';
import { user } from './Users/reducer';
import { layout } from './Layout/reducers';

export const appReducer = combineReducers({
  user,
  layout
});

export type IAppState = ReturnType<typeof appReducer>;