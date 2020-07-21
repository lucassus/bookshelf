import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLScalarType } from "graphql";
import path from "path";

import { secureId } from "../database/helpers";

export const externalIDScalarType = new GraphQLScalarType({
  name: "ExternalID",
  // TODO: Implement the serialization
  // serialize: (value) => value,
  parseValue: (value) => secureId.toInternal(value)
});

export const schema = loadSchemaSync(path.join(__dirname, "./**/*.graphql"), {
  loaders: [new GraphQLFileLoader()],
  resolvers: {
    ExternalID: externalIDScalarType
  }
});
