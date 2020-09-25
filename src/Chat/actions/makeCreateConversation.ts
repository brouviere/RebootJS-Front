import { IAppState } from "../../appReducer";
import { setAllConversationsAction } from "./conversationsAction";

export function makeCreateConversation(conversationId: string, target: string) {
  return (dispatch: any, _getState: () => IAppState) => {
    const conversations = _getState().conversation.conversations;
    const conversation = conversations.find(conv => conv._id === conversationId);
    if(!conversation){
      const newConversation = {
        _id: conversationId,
        targets: [ target ],
        updatedAt: new Date(),
        unseenMessages: 0,
        messages: []
      }

      dispatch(setAllConversationsAction(
        [
          ...conversations,
          newConversation
        ]
      ))
    }
  }
}