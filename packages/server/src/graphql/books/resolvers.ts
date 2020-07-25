import { checkAuthentication } from "../../common/authentication";
import { Context } from "../../common/types";
import { Book } from "../../database/entity/Book";
import { User } from "../../database/entity/User";
import { BookCopyRepository } from "../../database/repositories/BookCopyRepository";
import { BookRepository } from "../../database/repositories/BookRepository";
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
        .updateFavourite(id, favourite),

    borrowBookCopy: (rootValue, { id }, { connection, currentUser }) => {
      const user = checkAuthentication(currentUser);

      return connection.manager
        .getCustomRepository(BookCopyRepository)
        .borrow(id, user.id);
    },

    returnBookCopy: (rootValue, { id }, { connection, currentUser }) => {
      const user = checkAuthentication(currentUser);

      return connection.manager
        .getCustomRepository(BookCopyRepository)
        .return(id, user.id);
    }
  },

  Book: {
    author: (book, args, { authorsLoader }) =>
      authorsLoader.load(book.authorId),

    cover: ({ coverPath: path }, args, { assetsBaseUrl }) => ({
      path,
      url: assetsBaseUrl + path
    })
  },

  BookCopy: {
    // TODO: A workaround for user.avatar eager loading, see https://github.com/typeorm/typeorm/issues/2315
    owner: (bookCopy, args, { connection }) =>
      connection.manager.findOneOrFail(User, bookCopy.ownerId),

    // TODO: A workaround for user.avatar eager loading, see https://github.com/typeorm/typeorm/issues/2315
    borrower: (bookCopy, args, { connection }) =>
      bookCopy.borrowerId
        ? connection.manager.findOneOrFail(User, bookCopy.borrowerId)
        : null
  }
};
