import { db } from "../db";
import { Author, Book, User } from "../db/types";

interface Image {
  path: string;
}

export const resolvers = {
  Book: {
    author: (parent: Book) => db.authors.findOne({ id: parent.authorId }),
    cover: (parent): Image => ({
      path: parent.coverPath,
    }),
  },
  Author: {
    books: (parent: Author) => db.books.find({ authorId: parent.id }),
    photo: (parent): Image => ({
      path: parent.photoPath,
    }),
  },
  Avatar: {
    image: (parent: User["avatar"]): Image => ({
      path: parent.imagePath,
    }),
  },
  Image: {
    url: (parent: Image, args, context) => context.assetsBaseUrl + parent.path,
  },
  Query: {
    message: () => "Hello World!",

    books: () => db.books.find(),
    authors: () => db.authors.find(),
    users: () => db.users.find(),
  },
};
