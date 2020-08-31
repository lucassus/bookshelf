import { addMocksToSchema } from "@graphql-tools/mock";
import { addResolversToSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server";
import faker from "faker";
import { buildClientSchema } from "graphql";

import { ASSETS_BASE_URL, PORT } from "./config";
import { mocks } from "./mocks";
import introspectionResult from "./schema.json";

const schema = buildClientSchema(introspectionResult as any);

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers: {
    Timestampable: {
      createdAt: () =>
        faker.date.between(new Date(2018, 0, 1), new Date()).toISOString(),
      updatedAt: () =>
        faker.date.between(new Date(2018, 0, 1), new Date()).toISOString()
    },
    Person: {
      name: () => faker.name.findName(),
      email: () => faker.internet.email(),
      info: () => faker.lorem.paragraph()
    }
  },
  inheritResolversFromInterfaces: true
});

const schemaWithMocks = addMocksToSchema({
  schema: schemaWithResolvers,
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
