import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import path from "path";

export const schema = loadSchemaSync(path.join(__dirname, "./**/*.graphql"), {
  loaders: [new GraphQLFileLoader()]
});
