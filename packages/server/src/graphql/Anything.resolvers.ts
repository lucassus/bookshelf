import { findAnythingOrFail } from "../database/findAnythingOrFail";
import { Resolvers } from "../resolvers-types.generated";
import { Context } from "../types";

export const resolvers: Resolvers<Context> = {
  Query: {
    anything: (rootValue, args, { connection }) =>
      findAnythingOrFail(args.id, connection)
  },

  Anything: {
    __resolveType: (anything) =>
      Object.getPrototypeOf(anything).constructor.name
  }
};
