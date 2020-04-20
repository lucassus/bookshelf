import { Author, Book, User } from "../db/types";

interface Image {
  path: string;
}

export const resolvers = {
  Book: {
    author: (book: Book, args, { db }) =>
      db.authors.findOne({ id: book.authorId }),

    cover: (book: Book): Image => ({
      path: book.coverPath,
    }),
  },

  Author: {
    books: (author: Author, args, { db }) =>
      db.books.find({ authorId: author.id }),

    photo: (author: Author): Image => ({
      path: author.photoPath,
    }),
  },

  Avatar: {
    image: (avatar: User["avatar"]): Image => ({
      path: avatar.imagePath,
    }),
  },

  Image: {
    url: (image: Image, args, context) => context.assetsBaseUrl + image.path,
  },

  Query: {
    message: () => "Hello World!",

    books: (rootValue, args, { db }) => db.books.find(),
    authors: (rootValue, args, { db }) => db.authors.find(),
    users: (rootValue, args, { db }) => db.users.find(),
  },
};
