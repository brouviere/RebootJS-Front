import { IConversation, IConversationMessage } from "../Conversations/types";
import axios from 'axios';
import { IUser } from "../Users/User.interface";

export async function getConversations(connectedUser: IUser): Promise<IConversation[]> {
  const messages: IConversationMessage[] = await axios.get(
     `${process.env.REACT_APP_BACKEND}/messages`,
     { withCredentials: true }
   ).then(res => res.data);
   if(messages.length === 0) return []

   const batches = messages.reduce<{ [converstionId: string]: IConversationMessage[] }>(
     (res, message) => ({
       ...res,
       [message.conversationId]: [...(res[message.conversationId] || []), message],
     }),
     {},
   );

   const conversations : IConversation[] = [];
   for (const conversationId in batches) {
     const messages = batches[conversationId];

     const attendees = [...new Set(messages.flatMap(({ emitter, targets }) => [emitter, ...targets]))];
     const targets = attendees.filter((id: string) => id !== connectedUser._id);

     conversations.push({
       _id: conversationId,
       targets: targets,
       messages: messages,
       updatedAt: new Date(getLastMessageDate(messages)),
       unseenMessages: 0
     });
   }
   return conversations;
 }	

 function getLastMessageDate(messages: IConversationMessage[]) {
  return messages[messages.length - 1].createdAt;
 }

 export async function sendMessage(conversationId: string, targets: string[], content: string){
  const resp = await axios.post(`${process.env.REACT_APP_BACKEND}/messages`,
    {
      conversationId, targets, content
    },
    {
      withCredentials: true
    });
  return resp.data;
}

export async function patchConversationSeen(conversationId: string): Promise<IUser> {
  const res = await axios.patch(`${process.env.REACT_APP_BACKEND}/profiles/conversation-seen/${conversationId}`,
    {},
    {
      withCredentials: true
    }
  )
  return res.data;
}

// export function getConversations(): Promise<IConversation[]>{
//   return Promise.resolve(
//     [
//       {
//         _id: 'azertyuiop',
//         targets: [
//           '5f5639b2348e9671b16a5a6f',
//           '5f563886ea491c711a80be0e'
//         ],
//         updatedAt: new Date().toISOString(),
//         unseenMessages: 0,
//         messages: [
//           {
//             _id: '1',
//             conversationId: 'azertyuiop',
//             createdAt: new Date().toISOString(),
//             emitter: '5f5639b2348e9671b16a5a6f',
//             targets: [
//               '5f563886ea491c711a80be0e'
//             ],
//             content: 'Hello'
//           },
//           {
//             _id: '2',
//             conversationId: 'azertyuiop',
//             createdAt: new Date().toISOString(),
//             emitter: '5f563886ea491c711a80be0e',
//             targets: [
//               '5f5639b2348e9671b16a5a6f'
//             ],
//             content: 'World'
//           },
//         ],
//       }
//     ]
//   );
// }