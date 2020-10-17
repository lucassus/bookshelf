import { GraphQLScalarType } from "graphql";

import { toExternalId, toInternalId } from "../../common/secureId";
import { Author, Book, User } from "../../database/entity";
import { findAnythingOrFail } from "../../database/findAnythingOrFail";
import { Resolvers } from "../resolvers-types.generated";

const resolvers: Resolvers = {
  Query: {
    resources: (rootValue, args, { connection }) =>
      Promise.all([
        connection.getRepository(User).find(),
        connection.getRepository(Author).find(),
        connection.getRepository(Book).find()
      ]).then(([users, authors, books]) => [...users, ...authors, ...books]),

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
