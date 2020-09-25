
import { IUserState, UpdateConnectedUserAction } from '../User.interface'

export function updateConnectedUserCase(state: IUserState, action: UpdateConnectedUserAction) : IUserState{ 
    return {
      ...state,
      connectedUser: action.user
    }
}