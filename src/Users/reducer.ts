import { updateConnectedUserCase } from "./cases/updateConnectedUserCase";
import { IUserAction, IUserState, UPDATE_CONNECTED_USER } from '../Users/User.interface';
import { defaultUserState } from "./utils/defaultUserState";

export function user(state: IUserState = defaultUserState(), action: IUserAction) : IUserState{
  switch(action.type){
    case UPDATE_CONNECTED_USER:
      return updateConnectedUserCase(state, action);
    default:
      return state;
  }
}