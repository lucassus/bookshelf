import { findAnythingOrFail } from "../database/findAnythingOrFail";
import { Resolvers } from "../resolvers-types.generated";
import { Context } from "../types";

export const resolvers: Resolvers<Context> = {
  Query: {
    resource: (rootValue, args, { connection }) =>
      findAnythingOrFail(args.id, connection)
  },

  Resource: {
    __resolveType: (resource) =>
      Object.getPrototypeOf(resource).constructor.name
  }
};
