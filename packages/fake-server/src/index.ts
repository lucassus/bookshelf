import { titleizeSentence } from "@bookshelf/string-utils";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { ApolloServer, MockList } from "apollo-server";
import faker from "faker";
import path from "path";

const schema = loadSchemaSync(
  path.join(__dirname, "/schema.generated.graphql"),
  { loaders: [new GraphQLFileLoader()] }
);

const mocks = {
  Avatar: () => ({
    image: {
      path: "/image/sample-avatar.png",
      url: "https://images.com/image/sample-avatar.png"
    },
    color: "blue"
  }),
  User: () => ({
    name: faker.name.findName(),
    email: faker.internet.email(),
    info: faker.lorem.sentence()
  }),
  Book: () => ({
    title: titleizeSentence(
      faker.lorem.words(faker.random.number({ min: 1, max: 4 }))
    ),
    description: faker.lorem.sentence(),
    favourite: faker.random.boolean(),
    copies: () => new MockList([0, 4])
  }),
  Author: () => ({
    name: faker.name.findName(),
    bio: faker.lorem.sentence()
  }),
  Query: () => ({
    booksCount: 2,
    books: () => new MockList([2, 6])
  })
};

const server = new ApolloServer({
  schema,
  mocks
});

server.listen().then(({ url }) => {
  console.log(`🚀 Fake server ready at ${url}`);
});
