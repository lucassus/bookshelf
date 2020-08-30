import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { ApolloServer } from "apollo-server";
import path from "path";

import { PORT } from "./config";
import { mocks } from "./mocks";

const schema = loadSchemaSync(
  path.join(__dirname, "/schema.generated.graphql"),
  { loaders: [new GraphQLFileLoader()] }
);

const server = new ApolloServer({
  schema,
  mocks
});

server.listen(PORT).then(({ url }) => {
  console.log(`🚀 Fake server ready at ${url}`);
});
