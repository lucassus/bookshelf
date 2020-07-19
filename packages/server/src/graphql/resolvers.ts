import { Author } from "../database/entity/Author";
import { Avatar } from "../database/entity/Avatar";
import { Book } from "../database/entity/Book";
import { User } from "../database/entity/User";
import { findAnythingOrFail } from "../database/findAnythingOrFail";
import { secureId } from "../database/helpers";
import { BookCopyRepository } from "../database/repositories/BookCopyRepository";
import { BookRepository } from "../database/repositories/BookRepository";
import {
  Resolver,
  Resolvers,
  ResolversTypes
} from "../resolvers-types.generated";
import { Context } from "../types";

const id: Resolver<ResolversTypes["ID"], { id: number }> = (resource) =>
  secureId.toExternal(resource.id, resource.constructor.name);

const image: Resolver<
  ResolversTypes["Image"],
  Avatar | Author | Book,
  Context
> = (rootValue, args, { assetsBaseUrl }) => {
  let path = "/default.jpg";

  if (rootValue instanceof Avatar) {
    path = rootValue.imagePath;
  }

  if (rootValue instanceof Author) {
    path = rootValue.photoPath;
  }

  if (rootValue instanceof Book) {
    path = rootValue.coverPath;
  }

  return {
    path,
    url: assetsBaseUrl + path
  };
};

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
    cover: image,
    author: (book, args, { authorsLoader }) => authorsLoader.load(book.authorId)
  },

  Author: {
    id,
    photo: image
  },

  Avatar: { image },

  User: { id },

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
    borrowBookCopy: (rootValue, args, { connection, currentUser }) =>
      currentUser
        ? connection.manager
            .getCustomRepository(BookCopyRepository)
            .borrow(secureId.toInternal(args.id), currentUser.id)
        : null,

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
