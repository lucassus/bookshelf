import { GraphQLScalarType } from "graphql";

import { toExternalId, toInternalId } from "../../common/secureId";
import { Author, Book } from "../../database/entity";
import { findAnythingOrFail } from "../../database/findAnythingOrFail";
import { Context } from "../context";
import { Resolvers } from "../resolvers-types.generated";

const resolvers: Resolvers<Context> = {
  Query: {
    resources: async (rootValue, args, { connection }) => {
      const authors = await connection.getRepository(Author).find();
      const books = await connection.getRepository(Book).find();

      return [...authors, ...books];
    },

    resource: (rootValue, { id }, { connection }) =>
      findAnythingOrFail(id, connection),

    anything: (rootValue, { id }, { connection }) =>
      findAnythingOrFail(id, connection)
  },

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
