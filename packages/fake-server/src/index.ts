import { ApolloServer } from "apollo-server";
import { buildClientSchema } from "graphql";

import { PORT } from "./config";
import { mocks } from "./mocks";
import introspectionResult from "./schema.json";

const schema = buildClientSchema(introspectionResult as any);

const server = new ApolloServer({
  schema,
  mocks
});

server.listen(PORT).then(({ url }) => {
  console.log(`🚀 Fake server ready at ${url}`);
});
