export interface IUser {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  conversationSeen: {[conversationId: string]:string}
}