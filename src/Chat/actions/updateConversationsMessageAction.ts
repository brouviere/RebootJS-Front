import { IConversationMessage, IUpdateConversationsMessage, UPDATE_CONVERSATION_MESSAGE } from "../../Conversations/types";

export function updateConversationsMessage(message: IConversationMessage): IUpdateConversationsMessage {
  return {
    type: UPDATE_CONVERSATION_MESSAGE,
    message: message
  }
}