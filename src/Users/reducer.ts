import { setAllUsersCase } from "./cases/setAllUsersCase";
import { updateConnectedUserCase } from "./cases/updateConnectedUserCase";
import { IUserAction, IUserState, SET_ALL_USERS, UPDATE_CONNECTED_USER } from "./User.interface";
import { defaultUserState } from "./utils/defaultUserState";


export function user(state: IUserState = defaultUserState(), action: IUserAction) : IUserState{
  switch(action.type){
    case UPDATE_CONNECTED_USER:
      return updateConnectedUserCase(state, action);
    case SET_ALL_USERS:
      return setAllUsersCase(state, action);
    default:
      return state;
  }
}