import { GraphQLScalarType } from "graphql";

import { ResourcesService } from "~/infra/services/ResourcesService";
import { toExternalId, toInternalId } from "~/infra/support/secureId";
import { Resolvers } from "~/types/resolvers.generated";

const resolvers: Resolvers = {
  Query: {
    resources: (rootValue, args, { container }) =>
      container.get(ResourcesService).findAll(),

    resource: (rootValue, { id }, { container }) =>
      container.get(ResourcesService).findResourceOrFail(id),

    anything: (rootValue, { id }, { container }) =>
      container.get(ResourcesService).findResourceOrFail(id)
  },

  ExternalID: new GraphQLScalarType({
    name: "ExternalID",
    // `serialize` is handled by `Resource.id` resolver, because it requires object type
    parseValue: (externalId: any) => toInternalId(externalId)
  }),

  Resource: {
    id: (resource) => toExternalId(resource)
  }
};

export default resolvers;
