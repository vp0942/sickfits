import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { createAuth } from '@keystone-next/auth';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import { User } from './schemas/Users';
import { Product } from './schemas/Product';

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // How long they stay signedin
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // TODO: Add in initial roles here
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL,
      // TODO: Add data seeding here
    },
    lists: createSchema({
      // Schema items go in here
      User,
      Product,
    }),
    ui: {
      // Show the UI only for people who pass this test
      isAccessAllowed: ({ session }) => {
        console.log(session);
        // !! turns session into boolean as needed by typescript
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return !!session?.data;
      },
    },
    // Add session values here
    session: withItemData(statelessSessions(sessionConfig), {
      // GraphQL Query
      User: 'id name email',
    }),
  })
);