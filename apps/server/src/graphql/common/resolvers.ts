import { GraphQLScalarType } from "graphql";

import { secureId } from "../../common/secureId";
import { findAnythingOrFail } from "../../database/findAnythingOrFail";
import { Context } from "../context";
import { Resolvers } from "../resolvers-types.generated";

const resolvers: Resolvers<Context> = {
  Query: {
    resource: (rootValue, { id }, { connection }) =>
      findAnythingOrFail(id, connection),

    anything: (rootValue, { id }, { connection }) =>
      findAnythingOrFail(id, connection)
  },

  ExternalID: new GraphQLScalarType({
    name: "ExternalID",
    parseValue: (value) => secureId.toInternal(value)
  }),

  Timestampable: {
    __resolveType: (timestampable) =>
      Object.getPrototypeOf(timestampable).constructor.name,

    createdAt: (timestampable) => timestampable.createdAt.toISOString(),
    updatedAt: (timestampable) => timestampable.updatedAt.toISOString()
  },

  Resource: {
    __resolveType: (resource) =>
      Object.getPrototypeOf(resource).constructor.name,

    id: (resource) =>
      secureId.toExternal(resource.id, resource.constructor.name)
  },

  Anything: {
    __resolveType: (anything) =>
      Object.getPrototypeOf(anything).constructor.name
  }
};

export default resolvers;
