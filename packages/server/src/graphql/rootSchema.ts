import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { mergeResolvers } from "@graphql-tools/merge";
import { addResolversToSchema } from "@graphql-tools/schema";
import path from "path";

import { Context } from "../common/types";
import { Resolvers } from "./resolvers-types.generated";

export const rootSchema = addResolversToSchema({
  schema: loadSchemaSync(path.join(__dirname, "./**/schema.graphql"), {
    loaders: [new GraphQLFileLoader()]
  }),
  resolvers: mergeResolvers<Context, Resolvers<Context>>([
    require("./common/resolvers"),
    require("./users/resolvers"),
    require("./authentication/resolvers"),
    require("./authors/resolvers"),
    require("./books/resolvers")
  ]),
  inheritResolversFromInterfaces: true
});
