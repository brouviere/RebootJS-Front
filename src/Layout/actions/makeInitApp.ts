import { getConnectedUser } from "../../Api/UserApi";
import { IAppState } from "../../appReducer";
import { makeFetchConversations } from "../../Chat/actions/makeFetchConversations";
import { makeStartSocket } from "../../Socket/actions/makeStartSocket";
import { makeFetchUsers } from "../../Users/actions/makeFetchUsers";
import { updateConnectedUser } from "../../Users/actions/updateConnectedUser";

// -- Définition de l'action --
export function makeInitApp() {
  return async (dispatch: any, getState: () => IAppState) => {
    if(getState().user.connectedUser === undefined) {
      try {
        const connectedUser = await getConnectedUser();
        dispatch(updateConnectedUser(connectedUser));
      } catch (err) {
        console.log('No user connected');
      }
    }

    if(getState().user.connectedUser) {
      console.log('connectedUser', getState().user.connectedUser);
      dispatch(makeFetchUsers());
      dispatch(makeFetchConversations());
      dispatch(makeStartSocket())
    }
  }
}
