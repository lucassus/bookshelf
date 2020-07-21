import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLScalarType } from "graphql";
import path from "path";

import { secureId } from "../database/helpers";

export const schema = loadSchemaSync(path.join(__dirname, "./**/*.graphql"), {
  loaders: [new GraphQLFileLoader()],
  resolvers: {
    ExternalID: new GraphQLScalarType({
      name: "ExternalID",
      parseValue: (value) => secureId.toInternal(value)
    })
  }
});
