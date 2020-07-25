import { GraphQLScalarType } from "graphql";

import { secureId } from "../../database/helpers";
import { Context } from "../../types";
import { Resolvers } from "../resolvers-types.generated";

export const resolvers: Resolvers<Context> = {
  ExternalID: new GraphQLScalarType({
    name: "ExternalID",
    parseValue: (value) => secureId.toInternal(value)
  })
};
