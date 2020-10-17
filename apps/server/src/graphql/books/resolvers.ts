import { EntityNotFoundError } from "typeorm/error/EntityNotFoundError";

import { toExternalId } from "../../common/secureId";
import { Book, BookCopy } from "../../database/entity";
import { Resolvers } from "../resolvers-types.generated";
import { UsersService } from "../users/UsersService";
import { BookCopiesService } from "./services/BookCopiesService";
import { BooksService } from "./services/BooksService";

const resolvers: Resolvers = {
  Book: {
    __isTypeOf: (maybeBook) => maybeBook instanceof Book,

    author: (book, args, { authorsLoader }) =>
      authorsLoader.load(book.authorId),

    cover: ({ coverPath: path }, args, { assetsBaseUrl }) => ({
      path,
      url: assetsBaseUrl + path
    })
  },

  BookCopy: {
    __isTypeOf: (maybeBookCopy) => maybeBookCopy instanceof BookCopy,

    id: (bookCopy) => toExternalId(bookCopy),

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

        return Object.assign(updatedBook, { __typename: "Book" });
      } catch {
        return {
          __typename: "MutationError",
          message: "Something went wrong!"
        };
      }
    },

    borrowBookCopy: async (rootValue, { id }, { container, currentUser }) => {
      try {
        const bookCopy = await container
          .get(BookCopiesService)
          .borrow(id, currentUser!.id);

        return Object.assign(bookCopy, { __typename: "BookCopy" });
      } catch (error) {
        return {
          __typename: "MutationError",
          message: error.message
        };
      }
    },

    returnBookCopy: async (rootValue, { id }, { container, currentUser }) => {
      try {
        const bookCopy = await container
          .get(BookCopiesService)
          .return(id, currentUser!.id);

        return Object.assign(bookCopy, { __typename: "BookCopy" });
      } catch (error) {
        if (error instanceof EntityNotFoundError) {
          return {
            __typename: "MutationError",
            message: "Could not find borrowed book copy to return!"
          };
        }

        throw error;
      }
    }
  }
};

export default resolvers;
