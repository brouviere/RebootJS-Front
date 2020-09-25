import { IAppState } from '../../appReducer';
import {getUsers} from '.././/../Api/UserApi';
import { IUser } from '../User.interface';
import { setAllUsers } from './setAllUsers';

export function makeFetchUsers() {
  return (dispatch: any, _getState: () => IAppState) => {
    // fetch users API
    getUsers(0, 100)
    .then((fetchedUsers : IUser[]) => {
      dispatch(setAllUsers(fetchedUsers))
    })

  }
}