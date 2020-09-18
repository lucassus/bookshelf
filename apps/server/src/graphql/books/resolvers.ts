import { EntityNotFoundError } from "typeorm/error/EntityNotFoundError";

import { Book } from "../../database/entity";
import { Context } from "../context";
import { Resolvers } from "../resolvers-types.generated";
import { UsersService } from "../users/UsersService";
import { BookCopiesService } from "./services/BookCopiesService";
import { BooksService } from "./services/BooksService";

const resolvers: Resolvers<Context> = {
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
  },

  BookResult: {
    __resolveType: (maybeBook) => {
      if (maybeBook instanceof Book) {
        return "Book";
      }

      return "ResourceNotFoundError";
    }
  },

  Query: {
    booksCount: (rootValue, args, { container }) =>
      container.get(BooksService).count(),

    books: (rootValue, { limit: take, offset: skip }, { container }) =>
      container.get(BooksService).paginate(take, skip),

    book: async (rootValue, { id }, { container }) => {
      try {
        return await container.get(BooksService).findByIdOrFail(id);
      } catch (error) {
        if (error instanceof EntityNotFoundError) {
          return { message: "Could not find Book" };
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
      const book = await container.get(BooksService).findByIdOrFail(id);

      try {
        const updatedBook = await container
          .get(BooksService)
          .updateFavourite(book, favourite);

        return {
          success: true,
          message: updatedBook.favourite
            ? "Book was added to favourites."
            : "Book was removed from favourites.",
          book: updatedBook
        };
      } catch {
        return {
          success: false,
          message: "Something went wrong!",
          book
        };
      }
    },

    borrowBookCopy: async (rootValue, { id }, { container, currentUser }) => {
      try {
        const bookCopy = await container
          .get(BookCopiesService)
          .borrow(id, currentUser!.id);

        return {
          success: true,
          message: "Book was successfully borrowed.",
          bookCopy
        };
      } catch (error) {
        return {
          success: false,
          message: error.message
        };
      }
    },

    returnBookCopy: async (rootValue, { id }, { container, currentUser }) => {
      const bookCopy = await container
        .get(BookCopiesService)
        .return(id, currentUser!.id);

      // TODO: Add errors handling, eg. "Could not find borrowed book copy to return"
      return {
        success: true,
        message: "Book was successfully returned.",
        bookCopy
      };
    }
  }
};

export default resolvers;
