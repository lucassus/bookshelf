import { titleizeSentence } from "@bookshelf/string-utils";
import { MockList } from "apollo-server";
import faker from "faker";

export const mocks = {
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
    books: (rootValue, args) => new MockList(args.limit)
  })
};
