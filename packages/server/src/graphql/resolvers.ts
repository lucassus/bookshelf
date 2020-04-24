import { Author, Book, User } from "../db/types";
import { Context } from "../server";

interface Image {
  path: string;
}

export const resolvers = {
  Book: {
    author: (book: Book, args, { db }: Context) =>
      db.authors.findOne({ id: book.authorId }),

    cover: (book: Book): Image => ({
      path: book.coverPath
    })
  },

  Author: {
    books: (author: Author, args, { db }: Context) =>
      db.books.find({ authorId: author.id }),

    photo: (author: Author): Image => ({
      path: author.photoPath
    })
  },

  Avatar: {
    image: (avatar: User["avatar"]): Image => ({
      path: avatar.imagePath
    })
  },

  Image: {
    url: (image: Image, args, context: Context) =>
      context.assetsBaseUrl + image.path
  },

  Query: {
    books: (rootValue, args, { db }: Context) => db.books.find(),
    randomBook: (rootValue, args, { db }: Context) => db.books.findRandom(),

    authors: (rootValue, args, { db }: Context) => db.authors.find(),
    randomAuthor: (rootValue, args, { db }: Context) => db.authors.findRandom(),
    author: (rootValue, args, { db }: Context) =>
      db.authors.findOne({ id: args.id }),

    users: (rootValue, args, { db }: Context) => db.users.find()
  }
};
