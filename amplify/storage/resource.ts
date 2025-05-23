import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'fileuploads',
  access: (allow) => ({
    'upload/*': [
      allow.guest.to(['read', 'write', 'delete']),
      allow.authenticated.to(['read', 'write', 'delete']),
    ],
  }),
});
