import { IConversationsAction, IConversationState, SET_ALL_CONVERSATIONS } from "../../Conversations/types";

export function setAllConversationsCase(state: IConversationState, action: IConversationsAction): IConversationState {
  if(SET_ALL_CONVERSATIONS === action.type) {
    return {
      ...state,
      conversations: action.conversations
    }
  }
  return state
}