import { Book } from "../../database/entity/Book";
import { BookRepository } from "../../database/repositories/BookRepository";
import { Context } from "../../types";
import { Resolvers } from "../resolvers-types.generated";

export const resolvers: Resolvers<Context> = {
  Query: {
    booksCount: (rootValue, args, { connection }) =>
      connection.manager.count(Book),

    books: (rootValue, { limit: take, offset: skip }, { connection }) =>
      connection.manager.find(Book, { take, skip }),

    book: (rootValue, { id }, { connection }) =>
      connection.manager.findOneOrFail(Book, id),

    randomBook: (rootValue, args, { connection }) =>
      connection.getCustomRepository(BookRepository).findRandom()
  },

  Mutation: {
    updateBookFavourite: async (rootValue, { id, favourite }, { connection }) =>
      connection.manager
        .getCustomRepository(BookRepository)
        .updateFavourite(id, favourite)
  },

  Book: {
    author: (book, args, { authorsLoader }) =>
      authorsLoader.load(book.authorId),

    cover: ({ coverPath: path }, args, { assetsBaseUrl }) => ({
      path,
      url: assetsBaseUrl + path
    })
  }
};
