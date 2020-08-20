import { User } from "../../database/entity";
import { BookCopyRepository } from "../../database/repositories/BookCopyRepository";
import { Context } from "../context";
import { Resolvers } from "../resolvers-types.generated";
import { BooksService } from "./BooksService";

const resolvers: Resolvers<Context> = {
  Query: {
    booksCount: (rootValue, args, { container }) =>
      container.get(BooksService).count(),

    books: (rootValue, { limit: take, offset: skip }, { container }) =>
      container.get(BooksService).paginate(take, skip),

    book: (rootValue, { id }, { container }) =>
      container.get(BooksService).findOneByIdOrFail(id),

    randomBook: (rootValue, args, { container }) =>
      container.get(BooksService).findRandom()
  },

  Mutation: {
    updateBookFavourite: async (
      rootValue,
      { id, favourite },
      { container }
    ) => {
      const book = await container
        .get(BooksService)
        .updateFavourite(id, favourite);

      return {
        success: true,
        message: book.favourite
          ? "Book was added to favourites."
          : "Book was removed from favourites.",
        book
      };
    },

    borrowBookCopy: async (rootValue, { id }, { connection, currentUser }) => {
      const bookCopy = await connection.manager
        .getCustomRepository(BookCopyRepository)
        .borrow(id, currentUser!.id);

      return {
        success: true,
        message: "Book was successfully borrowed.",
        bookCopy
      };
    },

    returnBookCopy: async (rootValue, { id }, { connection, currentUser }) => {
      const bookCopy = await connection.manager
        .getCustomRepository(BookCopyRepository)
        .return(id, currentUser!.id);

      return {
        success: true,
        message: "Book was successfully returned.",
        bookCopy
      };
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

export default resolvers;
