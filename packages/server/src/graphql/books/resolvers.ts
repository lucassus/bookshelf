import { EntityNotFoundError } from "typeorm/error/EntityNotFoundError";

import { Book } from "../../database/entity";
import { Context } from "../context";
import { Resolvers } from "../resolvers-types.generated";
import { UsersService } from "../users/UsersService";
import { BookCopiesService } from "./services/BookCopiesService";
import { BooksService } from "./services/BooksService";

const resolvers: Resolvers<Context> = {
  // TODO: Find a more elegant solution
  BookResult: {
    __resolveType: (bookOrError) => {
      if (bookOrError instanceof Book) {
        return "Book";
      }

      return "BookNotFoundError";
    }
  },

  Query: {
    booksCount: (rootValue, args, { container }) =>
      container.get(BooksService).count(),

    books: (rootValue, { limit: take, offset: skip }, { container }) =>
      container.get(BooksService).paginate(take, skip),

    book: async (rootValue, { id }, { container }) => {
      try {
        const book = await container.get(BooksService).findByIdOrFail(id);
        return book;
      } catch (error) {
        if (error instanceof EntityNotFoundError) {
          return { message: error.message };
        }

        throw error;
      }
    },

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

    borrowBookCopy: async (rootValue, { id }, { container, currentUser }) => {
      const bookCopy = await container
        .get(BookCopiesService)
        .borrow(id, currentUser!.id);

      return {
        success: true,
        message: "Book was successfully borrowed.",
        bookCopy
      };
    },

    returnBookCopy: async (rootValue, { id }, { container, currentUser }) => {
      const bookCopy = await container
        .get(BookCopiesService)
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
    owner: (bookCopy, args, { container }) =>
      container.get(UsersService).findByIdOrFail(bookCopy.ownerId),

    borrower: (bookCopy, args, { container }) =>
      bookCopy.borrowerId
        ? container.get(UsersService).findByIdOrFail(bookCopy.borrowerId)
        : null
  }
};

export default resolvers;
