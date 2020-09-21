
import { IUserAction, IUserState, UPDATE_CONNECTED_USER } from '../User.interface'

export function updateConnectedUserCase(state: IUserState, action: IUserAction) : IUserState{ 
  if(action.type === UPDATE_CONNECTED_USER && action.user) {
    return {
      ...state,
      connectedUser: action.user
    }
  } else {
    return state;
  }
}