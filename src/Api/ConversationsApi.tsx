import { IConversation } from "../Conversations/types";

export function getConversations(): Promise<IConversation[]>{
  return Promise.resolve(
    [
      {
        _id: 'azertyuiop',
        targets: [
          '5f5639b2348e9671b16a5a6f',
          '5f563886ea491c711a80be0e'
        ],
        updatedAt: new Date().toISOString(),
        unseenMessages: 0,
        messages: [
          {
            _id: '1',
            conversationId: 'azertyuiop',
            createdAt: new Date().toISOString(),
            emitter: '5f5639b2348e9671b16a5a6f',
            targets: [
              '5f563886ea491c711a80be0e'
            ],
            content: 'Hello'
          },
          {
            _id: '2',
            conversationId: 'azertyuiop',
            createdAt: new Date().toISOString(),
            emitter: '5f563886ea491c711a80be0e',
            targets: [
              '5f5639b2348e9671b16a5a6f'
            ],
            content: 'World'
          },
        ],
      }
    ]
  );
}