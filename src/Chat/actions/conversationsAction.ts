import { IConversation, ISetAllConversationsAction, SET_ALL_CONVERSATIONS } from "../../Conversations/types";

export function setAllConversationsAction(conversations: IConversation[]): ISetAllConversationsAction {
  return {
    type: SET_ALL_CONVERSATIONS,
    conversations: conversations
  }
}