import { addMocksToSchema } from "@graphql-tools/mock";
import { addResolversToSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server";
import { buildClientSchema } from "graphql";

import { ASSETS_BASE_URL, PORT } from "./config";
import { mocks } from "./mocks";
import { resolvers } from "./resolvers";
import introspectionResult from "./schema.json";

const schemaWithResolvers = addResolversToSchema({
  schema: buildClientSchema(introspectionResult as any),
  resolvers,
  inheritResolversFromInterfaces: true
});

const schema = addMocksToSchema({
  schema: schemaWithResolvers,
  mocks,
  preserveResolvers: true
});

const server = new ApolloServer({
  schema,
  context: {
    assetsBaseUrl: ASSETS_BASE_URL
  }
});

server.listen(PORT).then(({ url }) => {
  console.log(`🚀 Fake server ready at ${url}`);
});
