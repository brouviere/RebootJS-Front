import { IConversationState, IUpdateConversationsMessage,  } from "../../Conversations/types"

export function updateConversationsMessageCase(state: IConversationState, action: IUpdateConversationsMessage): IConversationState {
  const message = action.message;
  const currentConversation = state.conversations.find(conv => conv._id === message.conversationId);
  if (!currentConversation) {
    return {
      ...state,
      conversations: [
        ...state.conversations,
        {
          _id: message.conversationId,
          unseenMessages: 1,
          targets: [
            ...message.targets,
            message.emitter
          ],
          updatedAt: message.createdAt,
          messages: [ message ]
        }
      ]
    }
  }
  return {
    ...state,
    conversations: [
      ...state.conversations.filter(conv => conv._id !== message.conversationId),
      {
        ...currentConversation,
        messages: [ ...currentConversation.messages, message]
      }
    ]
  }
}