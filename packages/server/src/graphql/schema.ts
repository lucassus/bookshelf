import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { mergeResolvers } from "@graphql-tools/merge";
import { addResolversToSchema } from "@graphql-tools/schema";
import path from "path";

import { Context } from "../types";
import { Resolvers } from "./resolvers-types.generated";

const schema = loadSchemaSync(path.join(__dirname, "./**/*.graphql"), {
  loaders: [new GraphQLFileLoader()]
});

const resolvers = mergeResolvers<Context, Resolvers<Context>>([
  require("./Anything").resolvers,
  require("./Author").resolvers,
  require("./Book").resolvers,
  require("./BookCopy").resolvers,
  require("./ExternalID").resolvers,
  require("./Resource").resolvers,
  require("./Timestampable").resolvers,
  require("./User").resolvers
]);

export const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
  inheritResolversFromInterfaces: true
});
