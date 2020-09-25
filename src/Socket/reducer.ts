import { changeConnectSocketCase } from "./cases/changeConnectSocketCase";
import { IConnectSocketState, IConnectSocketAction, CONNECT_SOCKET } from "./types";
import { defaultConnectSocketState } from "./utils/defaultConnectSocketState";


export function socket(state: IConnectSocketState = defaultConnectSocketState(), action: IConnectSocketAction): IConnectSocketState {
  switch(action.type){
    case CONNECT_SOCKET:
      return changeConnectSocketCase(state, action);
    default:
      return state;
  }
}