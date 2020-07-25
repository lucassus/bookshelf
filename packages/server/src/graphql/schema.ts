import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { mergeResolvers } from "@graphql-tools/merge";
import { addResolversToSchema } from "@graphql-tools/schema";
import path from "path";

import { Context } from "../types";
import { Resolvers } from "./resolvers-types.generated";

export const rootSchema = addResolversToSchema({
  schema: loadSchemaSync(path.join(__dirname, "./**/*.graphql"), {
    loaders: [new GraphQLFileLoader()]
  }),
  resolvers: mergeResolvers<Context, Resolvers<Context>>([
    require("./Common").resolvers,
    require("./Anything").resolvers,
    require("./Author").resolvers,
    require("./Book").resolvers,
    require("./BookCopy").resolvers,
    require("./User").resolvers
  ]),
  inheritResolversFromInterfaces: true
});
