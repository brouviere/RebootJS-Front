import { IUser, UpdateConnectedUserAction, UPDATE_CONNECTED_USER } from "../User.interface";

// -- Définition de l'action --
export function updateConnectedUser(user: IUser): UpdateConnectedUserAction {
  return {
    type: UPDATE_CONNECTED_USER,
    user: user
  }
}
// -- ./ Définition de l'action --