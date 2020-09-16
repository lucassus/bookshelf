import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers } from "@graphql-tools/merge";
import { addResolversToSchema } from "@graphql-tools/schema";
import { SchemaDirectiveVisitor } from "@graphql-tools/utils";
import path from "path";

import { RequireAuthorizationDirective } from "./authentication/RequireAuthorizationDirective";

const schema = loadSchemaSync(path.join(__dirname, "./**/schema.graphql"), {
  loaders: [new GraphQLFileLoader()]
});

const resolvers = mergeResolvers(
  loadFilesSync(path.join(__dirname, "./**/resolvers.{js,ts}"))
);

const rootSchema = addResolversToSchema({
  schema,
  resolvers,
  inheritResolversFromInterfaces: true
});

SchemaDirectiveVisitor.visitSchemaDirectives(rootSchema, {
  requireAuthorization: RequireAuthorizationDirective as typeof SchemaDirectiveVisitor
});

export { rootSchema };
