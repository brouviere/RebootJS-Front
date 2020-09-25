export type ISocketStatus = 'online' | 'offline' | undefined;

export const CONNECT_SOCKET = 'CONNECT_SOCKET';
export interface IConnectSocketAction {
  type: typeof CONNECT_SOCKET;
  status: ISocketStatus;
}
export interface IConnectSocketState {
  connectSocket?: ISocketStatus
}

export type ISocketAction = IConnectSocketAction