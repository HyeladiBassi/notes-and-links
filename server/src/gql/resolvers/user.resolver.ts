import { getUsers } from '../../db/Users/functions';

export default {
  Query: {
    users: () => {
      return getUsers();
    },
  },
};
