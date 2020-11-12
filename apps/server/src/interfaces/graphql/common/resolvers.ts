import { Resolvers } from "@/types/resolvers.generated";
import { GraphQLScalarType } from "graphql";

const resolvers: Resolvers = {
  ISODateString: new GraphQLScalarType({
    name: "ISODateString",
    serialize: (value) => (value instanceof Date ? value.toISOString() : null)
  })
};

export default resolvers;
