import { findAnythingOrFail } from "../../database/findAnythingOrFail";
import { secureId } from "../../database/helpers";
import { Context } from "../../types";
import { Resolvers } from "../resolvers-types.generated";

export const resolvers: Resolvers<Context> = {
  Query: {
    resource: (rootValue, args, { connection }) =>
      findAnythingOrFail(args.id, connection)
  },

  Resource: {
    __resolveType: (resource) =>
      Object.getPrototypeOf(resource).constructor.name,

    id: (resource) =>
      secureId.toExternal(resource.id, resource.constructor.name)
  }
};
