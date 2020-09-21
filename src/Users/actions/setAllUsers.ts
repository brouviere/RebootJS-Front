import { IUser, SetAllUsersAction, SET_ALL_USERS } from "../User.interface";


export function setAllUsers(users: IUser[]): SetAllUsersAction {
  return{
    type: SET_ALL_USERS,
    users: users
  }
}