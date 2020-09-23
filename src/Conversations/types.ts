export interface IConversation {
  _id: string;
  targets: string[];
  updatedAt: Date;
  unseenMessages: number;
  messages: IConversationMessage[];
}

export interface IConversationMessage {
  _id: string;
  conversationId: string;
  createdAt: string;
  emitter: string;
  targets: string[];
  content: string;
}

export const SET_ALL_CONVERSATIONS = "SET_ALL_CONVERSATIONS";
export interface ISetAllConversationsAction {
  type: typeof SET_ALL_CONVERSATIONS;
  conversations: IConversation[];
}

// Type du sous-store de Conversations
export interface IConversationState {
  conversations: IConversation[];
}

// type global contenant toutes les actions possibles de Conversations
export type IConversationsAction = ISetAllConversationsAction;