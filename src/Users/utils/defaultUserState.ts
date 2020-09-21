import { IUserState } from '../User.interface';

export function defaultUserState() : IUserState{
  return {
    connectedUser: {
      _id: "",
      firstname: "",
      lastname: "",
      email: "",
      conversationSeen: {}
    },
    users: []
    
  }
}