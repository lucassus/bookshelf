import { addMocksToSchema } from "@graphql-tools/mock";
import { ApolloServer } from "apollo-server";
import { buildClientSchema } from "graphql";

import { ASSETS_BASE_URL, PORT } from "./config";
import { mocks } from "./mocks";
import introspectionResult from "./schema.json";

const schema = buildClientSchema(introspectionResult as any);

const schemaWithMocks = addMocksToSchema({
  schema,
  mocks,
  preserveResolvers: true
});

const server = new ApolloServer({
  schema: schemaWithMocks,
  context: {
    assetsBaseUrl: ASSETS_BASE_URL
  }
});

server.listen(PORT).then(({ url }) => {
  console.log(`🚀 Fake server ready at ${url}`);
});
