import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { ApolloServer, MockList } from "apollo-server-express";
import express from "express";
import faker from "faker";
import path from "path";

import { titleizeSentence } from "./common/strings";
import { PORT } from "./config";

const schema = loadSchemaSync(
  path.join(__dirname, "./graphql/**/schema.graphql"),
  {
    loaders: [new GraphQLFileLoader()]
  }
);

const app = express();

const server = new ApolloServer({
  schema,
  mocks: {
    Avatar: () => ({
      image: {
        path: "/image/sample-avatar.png",
        url: "https://images.com/image/sample-avatar.png"
      },
      color: "blue"
    }),
    User: () => ({
      name: () => faker.name.findName(),
      email: () => faker.internet.email(),
      info: () => faker.lorem.sentence()
    }),
    Book: () => ({
      title: () =>
        titleizeSentence(
          faker.lorem.words(faker.random.number({ min: 1, max: 4 }))
        ),
      description: () => faker.lorem.sentence(),
      favourite: () => faker.random.boolean(),
      copies: () => new MockList([0, 4])
    }),
    Author: () => ({
      name: () => faker.name.findName(),
      bio: () => faker.lorem.sentence()
    }),
    Query: () => ({
      booksCount: 2,
      books: () => new MockList([2, 6])
    })
  }
});

server.applyMiddleware({ app });
app.listen({ port: PORT });

console.log(
  `🚀 GraphQL server ready at http://localhost:${PORT}${server.graphqlPath}`
);
