import { withFilter } from "apollo-server-express";
import { EntityNotFoundError } from "typeorm/error/EntityNotFoundError";

import { Book, BookCopy } from "~/infra/database/entity";
import { BookCopiesService } from "~/infra/services/BookCopiesService";
import { BooksService } from "~/infra/services/BooksService";
import { toExternalId } from "~/infra/support/secureId";
import { Resolvers } from "~/types/resolvers.generated";

const BOOK_COPY_UPDATED = "bookCopyUpdated";

const resolvers: Resolvers = {
  Book: {
    __isTypeOf: (maybeBook) => maybeBook instanceof Book,

    author: (book, args, { authorsLoader }) =>
      authorsLoader.load(book.authorId),

    cover: ({ coverPath: path }, args, { assetsBaseUrl }) => ({
      path,
      url: assetsBaseUrl + path
    }),

    isFavourite: async (book, args, { currentUser }) => {
      if (!currentUser) {
        return null;
      }

      const favouriteBooks = await currentUser.favouriteBooks;
      return favouriteBooks.some(
        (favouriteBook) => favouriteBook.id === book.id
      );
    }
  },

  BookCopy: {
    __isTypeOf: (maybeBookCopy) => maybeBookCopy instanceof BookCopy,

    id: (bookCopy) => toExternalId(bookCopy),

    book: (bookCopy, args, { booksLoader }) =>
      booksLoader.load(bookCopy.bookId),

    owner: (bookCopy, args, { usersLoader }) =>
      usersLoader.load(bookCopy.ownerId),

    borrower: (bookCopy, args, { usersLoader }) =>
      bookCopy.borrowerId ? usersLoader.load(bookCopy.borrowerId) : null
  },

  Query: {
    booksCount: (rootValue, args, { container }) =>
      container.get(BooksService).count(),

    books: (rootValue, { limit: take, offset: skip }, { container }) =>
      container.get(BooksService).paginate({ take, skip }),

    book: async (rootValue, { id }, { container }) => {
      try {
        return await container.get(BooksService).findByIdOrFail(id);
      } catch (error) {
        if (error instanceof EntityNotFoundError) {
          return {
            __typename: "ResourceNotFoundError",
            message: "Could not find Book"
          };
        }

        throw error;
      }
    },

    randomBook: async (rootValue, args, { container }) => {
      const book = await container.get(BooksService).findRandom();
      return book ?? null;
    }
  },

  Mutation: {
    addBookToFavourites: async (
      rootValue,
      { id },
      { container, currentUser }
    ) => {
      try {
        const book = await container.get(BooksService).findByIdOrFail(id);
        await container.get(BooksService).addToFavourite(book, currentUser);

        return book;
      } catch (error) {
        if (error instanceof EntityNotFoundError) {
          return {
            __typename: "ResourceNotFoundError",
            message: "Could not find Book"
          };
        }

        throw error;
      }
    },

    removeBookFromFavourites: async (
      rootValue,
      { id },
      { container, currentUser }
    ) => {
      try {
        const book = await container.get(BooksService).findByIdOrFail(id);
        await container
          .get(BooksService)
          .removeFromFavourites(book, currentUser);

        return book;
      } catch (error) {
        if (error instanceof EntityNotFoundError) {
          return {
            __typename: "ResourceNotFoundError",
            message: "Could not find Book"
          };
        }

        throw error;
      }
    },

    borrowBookCopy: async (
      rootValue,
      { id },
      { container, currentUser, pubsub }
    ) => {
      try {
        const bookCopy = await container
          .get(BookCopiesService)
          .borrow(id, currentUser.id);

        await pubsub.publish(BOOK_COPY_UPDATED, {
          bookCopyUpdated: bookCopy
        });

        return Object.assign(bookCopy, { __typename: "BookCopy" });
      } catch (error) {
        return {
          __typename: "MutationError",
          message: error.message
        };
      }
    },

    returnBookCopy: async (
      rootValue,
      { id },
      { container, currentUser, pubsub }
    ) => {
      try {
        const bookCopy = await container
          .get(BookCopiesService)
          .return(id, currentUser.id);

        await pubsub.publish(BOOK_COPY_UPDATED, {
          bookCopyUpdated: bookCopy
        });

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
  },

  Subscription: {
    bookCopyUpdated: {
      subscribe: withFilter(
        (rootValue, args, { pubsub }) => {
          return pubsub.asyncIterator(BOOK_COPY_UPDATED);
        },
        (
          { bookCopyUpdated: bookCopy }: { bookCopyUpdated: BookCopy },
          { id }: { id: number }
        ) => {
          // Client will receive updated only for book copies that are visible on the screen
          return bookCopy.id === id;
        }
      )
    }
  }
};

export default resolvers;
