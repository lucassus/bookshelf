import { GraphQLScalarType } from "graphql";

import { toExternalId, toInternalId } from "../../common/secureId";
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
    parseValue: (externalId) => toInternalId(externalId)
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

    id: (resource) => toExternalId(resource)
  },

  Anything: {
    __resolveType: (anything) =>
      Object.getPrototypeOf(anything).constructor.name
  }
};

export default resolvers;