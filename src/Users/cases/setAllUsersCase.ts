import { IUserState, IUserAction, SET_ALL_USERS } from "../User.interface";

export function setAllUsersCase(state: IUserState, action: IUserAction) : IUserState{
  if(action.type === SET_ALL_USERS) {
    return {         
      ...state,
      users: action.users}
  } else {
    return state;
  }
}