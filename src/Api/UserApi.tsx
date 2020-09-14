import { IUser} from '../Users/User.interface'
import axios from 'axios';

// fetch users via the server
export function getUsers(skip: number, limit: number): Promise<IUser[]> {
  return axios.get(`http://localhost:3000/profiles?skip=${skip}&limit=${limit}`,
    {
      withCredentials: true
    })
    .then(resp => {
      return resp.data
    })
}
// fetch an user
export function findById(id: number): Promise<IUser> {
  return axios.get(`http://localhost:3000/profiles/${id}`,
    {
      withCredentials: true
    })
    .then(resp => {
      return resp.data
    })
}

export function getConnectedProfile(): Promise<IUser> {
  return axios.get( `${process.env.REACT_APP_BACKEND}/profile/me`, { withCredentials: true }
  ).then(resp => resp.data)
}

export function login(email: string, password: string): Promise<IUser>{
  return axios
    .post('http://localhost:3000/login',
    {
      username: email,
      password: password
    },
    {
      withCredentials: true
    })
    .then(resp => resp.data)
}

export function register(email: string, password: string, firstname: string, lastname: string) : Promise<IUser>{
  return axios.post(`${process.env.REACT_APP_BACKEND}/profiles`, { email, password, firstname, lastname })
    .then(resp => resp.data);
}