import { IConversationsAction, IConversationState, SET_ALL_CONVERSATIONS, UPDATE_CONVERSATION_MESSAGE } from "../Conversations/types";
import { defaultConversationsState } from "../Conversations/utils/defaultConversationsState";
import { setAllConversationsCase } from "./cases/conversationsCases";
import { updateConversationsMessageCase } from "./cases/updateConversationsMessageCase";

export function conversation( state: IConversationState = defaultConversationsState(), action: IConversationsAction): IConversationState {
  switch(action.type) {
    case SET_ALL_CONVERSATIONS:
      return setAllConversationsCase(state, action)
    case UPDATE_CONVERSATION_MESSAGE:
      return updateConversationsMessageCase(state, action)

    default:
      return state
  }
}