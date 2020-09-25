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
  createdAt: Date;
  emitter: string;
  targets: string[];
  content: string;
}

export const SET_ALL_CONVERSATIONS = "SET_ALL_CONVERSATIONS";
export interface ISetAllConversationsAction {
  type: typeof SET_ALL_CONVERSATIONS;
  conversations: IConversation[];
}

export const UPDATE_CONVERSATION_MESSAGE = "UPDATE_CONVERSATION_MESSAGE";
export interface IUpdateConversationsMessage {
  type: typeof UPDATE_CONVERSATION_MESSAGE;
  message: IConversationMessage;
}

export const CREATE_CONVERSATION = "CREATE_CONVERSATION";
export interface ICreateConversation {
  type: typeof CREATE_CONVERSATION;
  conversation: IConversation;
}

// Type du sous-store de Conversations
export interface IConversationState {
  conversations: IConversation[];
}

// type global contenant toutes les actions possibles de Conversations
export type IConversationsAction = ISetAllConversationsAction | IUpdateConversationsMessage | ICreateConversation;