import { Resolvers } from "~/types/resolvers.generated";

const currentUserResolver: Resolvers = {
  Query: {
    currentUser: (rootValue, arg, { currentUser }) => currentUser ?? null
  }
};

export default currentUserResolver;
