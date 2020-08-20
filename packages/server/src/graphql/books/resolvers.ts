import { Context } from "../context";
import { Resolvers } from "../resolvers-types.generated";
import { UsersService } from "../users/UsersService";
import { BookCopiesService } from "./services/BookCopiesService";
import { BooksService } from "./services/BooksService";

const resolvers: Resolvers<Context> = {
  Query: {
    booksCount: (rootValue, args, { injector }) =>
      injector.get(BooksService).count(),

    books: (rootValue, { limit: take, offset: skip }, { injector }) =>
      injector.get(BooksService).paginate(take, skip),

    book: (rootValue, { id }, { injector }) =>
      injector.get(BooksService).findByIdOrFail(id),

    randomBook: (rootValue, args, { injector }) =>
      injector.get(BooksService).findRandom()
  },

  Mutation: {
    updateBookFavourite: async (rootValue, { id, favourite }, { injector }) => {
      const book = await injector
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

    borrowBookCopy: async (rootValue, { id }, { injector, currentUser }) => {
      const bookCopy = await injector
        .get(BookCopiesService)
        .borrow(id, currentUser!.id);

      return {
        success: true,
        message: "Book was successfully borrowed.",
        bookCopy
      };
    },

    returnBookCopy: async (rootValue, { id }, { injector, currentUser }) => {
      const bookCopy = await injector
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
    owner: (bookCopy, args, { injector }) =>
      injector.get(UsersService).findByIdOrFail(bookCopy.ownerId),

    borrower: (bookCopy, args, { injector }) =>
      bookCopy.borrowerId
        ? injector.get(UsersService).findByIdOrFail(bookCopy.borrowerId)
        : null
  }
};

export default resolvers;
