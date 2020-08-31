import { SecureId } from "@bookshelf/secure-id";
import { titleizeSentence } from "@bookshelf/string-utils";
import { MockList } from "apollo-server";
import faker from "faker";

import {
  AUTHOR_PHOTOS,
  AVATAR_COLORS,
  AVATAR_IMAGES,
  BOOK_COVERS
} from "./image-paths";

const secureId = new SecureId<string>({ separator: "-" });

export const mocks = {
  ExternalID: (resource) =>
    secureId.toExternal(
      faker.random.number({ min: 1, max: 1000 }),
      resource.__typename
    ),
  Avatar: (rootValue, args, { assetsBaseUrl }) => {
    const path = faker.random.arrayElement(AVATAR_IMAGES);

    return {
      image: {
        path,
        url: assetsBaseUrl + path
      },
      color: faker.random.arrayElement(AVATAR_COLORS)
    };
  },
  User: () => ({
    __typename: "User",
    name: faker.name.findName(),
    email: faker.internet.email(),
    info: faker.lorem.paragraph()
  }),
  Book: (rootValue, args, { assetsBaseUrl }) => {
    const path = faker.random.arrayElement(BOOK_COVERS);

    return {
      __typename: "Book",
      title: titleizeSentence(
        faker.lorem.words(faker.random.number({ min: 1, max: 4 }))
      ),
      cover: {
        path,
        url: assetsBaseUrl + path
      },
      description: faker.lorem.paragraph(2),
      favourite: faker.random.boolean(),
      copies: () => new MockList([0, 4])
    };
  },
  Author: (rootValue, args, { assetsBaseUrl }) => {
    const path = faker.random.arrayElement(AUTHOR_PHOTOS);

    return {
      __typename: "Author",
      name: faker.name.findName(),
      bio: faker.lorem.paragraphs(4),
      photo: {
        path,
        url: assetsBaseUrl + path
      }
    };
  },
  Query: () => {
    faker.seed(42);

    return {
      booksCount: () => faker.random.number({ min: 1, max: 64 }),
      authors: () => new MockList([3, 8]),
      books: (rootValue, args) => new MockList(args.limit),
      users: () => new MockList([4, 16])
    };
  }
};
