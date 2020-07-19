import { Author } from "../database/entity/Author";
import { Book } from "../database/entity/Book";
import { User } from "../database/entity/User";
import { findAnythingOrFail } from "../database/findAnythingOrFail";
import { secureId } from "../database/helpers";
import { BookCopyRepository } from "../database/repositories/BookCopyRepository";
import { BookRepository } from "../database/repositories/BookRepository";
import { Resolvers } from "../resolvers-types.generated";
import { Context } from "../types";

const id = (rootValue: { id: number }): string =>
  secureId.toExternal(rootValue.id, rootValue.constructor.name);

// TODO: Find a way for more modular code organization
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
      connection.getCustomRepository(BookRepository).findRandom(),

    authors: (rootValue, args, { connection }) =>
      connection.manager.find(Author),

    author: (rootValue, args, { authorsLoader }) =>
      authorsLoader.load(secureId.toInternal(args.id)),

    users: (rootValue, args, { connection }) => connection.manager.find(User),

    user: (rootValue, args, { connection }) =>
      connection.manager.findOneOrFail(User, secureId.toInternal(args.id)),

    anything: (rootValue, args, { connection }) =>
      findAnythingOrFail(args.id, connection),

    resource: (rootValue, args, { connection }) =>
      findAnythingOrFail(args.id, connection)
  },

  Book: {
    id,
    cover: (book) => ({
      path: book.coverPath,
      // TODO: How to fix it?
      url: ""
    }),
    author: (book, args, { authorsLoader }) => authorsLoader.load(book.authorId)
  },

  Author: {
    id,
    photo: (author) => ({
      path: author.photoPath,
      url: ""
    })
  },

  User: {
    id
  },

  Avatar: {
    image: (avatar) => ({
      path: avatar.imagePath,
      url: ""
    })
  },

  Image: {
    url: (image, args, { assetsBaseUrl }) => assetsBaseUrl + image.path
  },

  Anything: {
    __resolveType: (anything) =>
      Object.getPrototypeOf(anything).constructor.name
  },

  Resource: {
    __resolveType: (resource) =>
      Object.getPrototypeOf(resource).constructor.name
  },

  BookCopy: {
    id,

    // TODO: A workaround for user.avatar eager loading, see https://github.com/typeorm/typeorm/issues/2315
    owner: (bookCopy, args, { connection }) =>
      connection.manager.findOneOrFail(User, bookCopy.ownerId),
    borrower: (bookCopy, args, { connection }) =>
      bookCopy.borrowerId
        ? connection.manager.findOneOrFail(User, bookCopy.borrowerId)
        : null
  },

  Mutation: {
    borrowBookCopy: (rootValue, args, { connection, currentUserId }) =>
      connection.manager
        .getCustomRepository(BookCopyRepository)
        .borrow(secureId.toInternal(args.id), currentUserId),

    returnBookCopy: (rootValue, args, { connection }) =>
      connection.manager
        .getCustomRepository(BookCopyRepository)
        .return(secureId.toInternal(args.id)),

    updateBookFavourite: async (rootValue, args, { connection }) =>
      connection.manager
        .getCustomRepository(BookRepository)
        .updateFavourite(secureId.toInternal(args.id), args.favourite)
  }
};
