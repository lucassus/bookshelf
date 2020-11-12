import { GraphQLScalarType } from "graphql";

import { Resolvers } from "../../types/resolvers.generated";

const resolvers: Resolvers = {
  ISODateString: new GraphQLScalarType({
    name: "ISODateString",
    serialize: (value) => (value instanceof Date ? value.toISOString() : null)
  })
};

export default resolvers;
