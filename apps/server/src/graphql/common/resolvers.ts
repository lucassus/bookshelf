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

  ISODateString: new GraphQLScalarType({
    name: "ISODateString",
    serialize: (value) => (value instanceof Date ? value.toISOString() : null)
  }),

  ExternalID: new GraphQLScalarType({
    name: "ExternalID",
    // `serialize` is handled by `Resource.id` resolver, because it requires object type
    parseValue: (externalId) => toInternalId(externalId)
  }),

  Resource: {
    id: (resource) => toExternalId(resource)
  }
};

export default resolvers;
