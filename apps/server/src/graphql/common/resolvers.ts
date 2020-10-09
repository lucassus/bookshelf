import { GraphQLScalarType } from "graphql";

import { Context } from "../context";
import { Resolvers } from "../resolvers-types.generated";

const resolvers: Resolvers<Context> = {
  ISODateString: new GraphQLScalarType({
    name: "ISODateString",
    serialize: (value) => (value instanceof Date ? value.toISOString() : null)
  })
};

export default resolvers;
