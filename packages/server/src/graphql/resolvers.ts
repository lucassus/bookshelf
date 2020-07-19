import { Author } from "../database/entity/Author";
import { Avatar } from "../database/entity/Avatar";
import { Book } from "../database/entity/Book";
import { BookCopy } from "../database/entity/BookCopy";
import { User } from "../database/entity/User";
import { findAnythingOrFail } from "../database/findAnythingOrFail";
import { secureId } from "../database/helpers";
import { BookCopyRepository } from "../database/repositories/BookCopyRepository";
import { BookRepository } from "../database/repositories/BookRepository";
import { Context, Resolvers } from "../types";

interface Image {
  path: string;
}

const id = (rootValue: { id: number }): string =>
  secureId.toExternal(rootValue.id, rootValue.constructor.name);

// TODO: Find a way for more modular code organization
export const resolvers: Resolvers<Context> = {
  Query: {
    booksCount: (rootValue, args, { connection }) =>
      connection.manager.count(Book),

    books: (
      rootValue,
      args: { limit: number; offset: number },
      { connection }
    ) =>
      connection.manager.find(Book, {
        take: args.limit,
        skip: args.offset
      }),

    book: (rootValue, args: { id: string }, { connection }) =>
      connection.manager.findOneOrFail(Book, secureId.toInternal(args.id)),

    randomBook: (rootValue, args, { connection }) =>
      connection.getCustomRepository(BookRepository).findRandom(),

    authors: (rootValue, args, { connection }) =>
      connection.manager.find(Author),

    author: (rootValue, args: { id: string }, { authorsLoader }) =>
      authorsLoader.load(secureId.toInternal(args.id)),

    users: (rootValue, args, { connection }) => connection.manager.find(User),

    user: (rootValue, args: { id: string }, { connection }) =>
      connection.manager.findOneOrFail(User, secureId.toInternal(args.id)),

    anything: (rootValue, args: { id: string }, { connection }) =>
      findAnythingOrFail(args.id, connection),

    resource: (rootValue, args: { id: string }, { connection }) =>
      findAnythingOrFail(args.id, connection)
  },

  Book: {
    id,
    cover: (book: Book): Image => ({
      path: book.coverPath
    }),
    author: (book: Book, args, { authorsLoader }) =>
      authorsLoader.load(book.authorId)
  },

  Author: {
    id,
    photo: (author: Author): Image => ({
      path: author.photoPath
    })
  },

  User: {
    id
  },

  Avatar: {
    image: (avatar: Avatar): Image => ({
      path: avatar.imagePath
    })
  },

  Image: {
    url: (image: Image, args, { assetsBaseUrl }) => assetsBaseUrl + image.path
  },

  Anything: {
    __resolveType: (anything: Author | Book | User | BookCopy) =>
      Object.getPrototypeOf(anything).constructor.name
  },

  BookCopy: {
    id,
    owner: (bookCopy: BookCopy, args, { connection }) =>
      connection.manager.findOneOrFail(User, bookCopy.ownerId),
    borrower: (bookCopy: BookCopy, args, { connection }) =>
      bookCopy.borrowerId &&
      connection.manager.findOneOrFail(User, bookCopy.borrowerId)
  },

  Resource: {
    __resolveType: (resource) => resource.constructor.name
  },

  Mutation: {
    borrowBookCopy: (
      rootValue,
      args: { id: string },
      { connection, currentUserId }
    ) =>
      connection.manager
        .getCustomRepository(BookCopyRepository)
        .borrow(secureId.toInternal(args.id), currentUserId),

    returnBookCopy: (rootValue, args: { id: string }, { connection }) =>
      connection.manager
        .getCustomRepository(BookCopyRepository)
        .return(secureId.toInternal(args.id)),

    updateBookFavourite: async (
      rootValue,
      args: { id: string; favourite: boolean },
      { connection }
    ) =>
      connection.manager
        .getCustomRepository(BookRepository)
        .updateFavourite(secureId.toInternal(args.id), args.favourite)
  }
};
