import { combineReducers } from 'redux';
import { user } from './Users/reducer';


export const appReducer = combineReducers({
  user
});

export type IAppState = ReturnType<typeof appReducer>