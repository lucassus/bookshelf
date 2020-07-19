import { Book } from "../../database/entity/Book";
import { secureId } from "../../database/helpers";
import { BookRepository } from "../../database/repositories/BookRepository";
import { Context } from "../../types";
import { id, image } from "../common";
import { Resolvers } from "../resolvers-types.generated";

export const resolvers: Resolvers<Context> = {
  Query: {
    booksCount: (rootValue, args, { connection }) =>
      connection.manager.count(Book),

    books: (rootValue, args, { connection }) =>
      connection.manager.find(Book, {
        take: args.limit,
        skip: args.offset
      }),

    book: (rootValue, args, { connection }) =>
      connection.manager.findOneOrFail(Book, secureId.toInternal(args.id)),

    randomBook: (rootValue, args, { connection }) =>
      connection.getCustomRepository(BookRepository).findRandom()
  },

  Mutation: {
    updateBookFavourite: async (rootValue, args, { connection }) =>
      connection.manager
        .getCustomRepository(BookRepository)
        .updateFavourite(secureId.toInternal(args.id), args.favourite)
  },

  Book: {
    id,
    cover: image,
    author: (book, args, { authorsLoader }) => authorsLoader.load(book.authorId)
  }
};
