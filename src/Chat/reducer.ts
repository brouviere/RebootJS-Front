import { IConversationsAction, IConversationState, SET_ALL_CONVERSATIONS } from "../Conversations/types";
import { defaultConversationsState } from "../Conversations/utils/defaultConversationsState";
import { setAllConversationsCase } from "./cases/conversationsCases";

export function conversation( state: IConversationState = defaultConversationsState(), action: IConversationsAction): IConversationState {
  switch(action.type) {
    case SET_ALL_CONVERSATIONS:
      return setAllConversationsCase(state, action)

    default:
      return state
  }
}