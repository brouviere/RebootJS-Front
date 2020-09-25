import { IConnectSocketAction, IConnectSocketState } from "../types";

export function changeConnectSocketCase(state: IConnectSocketState, action: IConnectSocketAction) : IConnectSocketState{
  return {
    ...state,
    connectSocket: action.status
  }
}