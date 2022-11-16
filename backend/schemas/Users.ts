import { text, password, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

// Named export used to make outoimports work a bit nicer
export const User = list({
  // access:
  // ui
  fields: {
    name: text({ isRequired: true, isIndexed: true }),
    email: text({ isRequired: true, isUnique: true }),
    password: password(),
    // TODO: Add roles, cards ans orders,
  },
});
