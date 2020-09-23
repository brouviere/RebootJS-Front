import { getConversations } from "../../Api/ConversationsApi"
import { IAppState } from "../../appReducer"
import { IConversation } from "../../Conversations/types"
import { setAllConversationsAction } from "./conversationsAction"

export function makeFetchConversations() {
  return (dispatch: any, _getState: () => IAppState) => {
    // fetch conversations API
    const connectedUser = _getState().user.connectedUser;
    if(connectedUser){
      getConversations(connectedUser)
      .then((fetchedConversations : IConversation[]) => {
        dispatch(setAllConversationsAction(fetchedConversations))
      })
    }
    
  }
}