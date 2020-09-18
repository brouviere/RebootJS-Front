
import { IUserAction, IUserState } from '../User.interface'

export function updateConnectedUserCase(state: IUserState, action: IUserAction) : IUserState{
  return {
    ...state,
    connectedUser: action.user
  }
}