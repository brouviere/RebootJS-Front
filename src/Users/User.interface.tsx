export interface IUser {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  conversationSeen: {[conversationId: string]:string}
}

// --- Définition des types de l'actions ---
export const UPDATE_CONNECTED_USER = 'UPDATE_CONNECTED_USER';
export interface UpdateConnectedUserAction {
  type: typeof UPDATE_CONNECTED_USER,
  user: IUser
}
// --- ./Définition des types de l'actions ---

export interface IUserState {
  connectedUser?: IUser
}

export type IUserAction = UpdateConnectedUserAction;