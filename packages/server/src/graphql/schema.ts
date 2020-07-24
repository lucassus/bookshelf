import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import path from "path";

import { resolvers } from "./resolvers";

const schema = loadSchemaSync(path.join(__dirname, "./**/*.graphql"), {
  loaders: [new GraphQLFileLoader()]
});

export const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
  inheritResolversFromInterfaces: true
});
