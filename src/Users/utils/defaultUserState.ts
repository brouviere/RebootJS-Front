import { IUserState } from '../User.interface';

export function defaultUserState() : IUserState{
  return {
    connectedUser: undefined,
    users: []
  }
}