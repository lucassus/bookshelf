import { Connection, ObjectType } from "typeorm";

import { BookRepository } from "../database/BookRepository";
import { Author } from "../database/entity/Author";
import { Avatar } from "../database/entity/Avatar";
import { Book } from "../database/entity/Book";
import { BookCopy } from "../database/entity/BookCopy";
import { User } from "../database/entity/User";
import { secureId } from "../database/helpers";
import { Context } from "../server";

interface Image {
  path: string;
}

const findAnythingOrFail = (
  externalId: string,
  connection: Connection
): Promise<Author | Book | User | BookCopy> => {
  const [id, type] = secureId.toInternalAndType(externalId);

  const map: Record<string, ObjectType<Author | Book | User | BookCopy>> = {
    Author,
    Book,
    User,
    BookCopy
  };

  if (!map[type]) {
    throw Error(`Unknown type: ${type}`);
  }

  return connection.manager.findOneOrFail(map[type], id);
};

export const resolvers = {
  // TODO: Figure out how to type the args
  Query: {
    booksCount: (rootValue: any, args: any, { connection }: Context) =>
      connection.manager.count(Book),

    // TODO: It produces quite a lot of n+1 queries
    books: (
      rootValue: any,
      args: { limit: number; offset: number },
      { connection }: Context
    ) =>
      connection.manager.find(Book, {
        take: args.limit,
        skip: args.offset,
        relations: ["author"]
      }),

    book: (rootValue: any, args: { id: string }, { connection }: Context) =>
      connection.manager.findOneOrFail(Book, secureId.toInternal(args.id)),

    randomBook: (rootValue: any, args: any, { connection }: Context) =>
      connection.getCustomRepository(BookRepository).findRandom(),

    authors: (rootValue: any, args: any, { connection }: Context) =>
      connection.manager.find(Author),

    author: (rootValue: any, args: { id: string }, { connection }: Context) =>
      connection.manager.findOneOrFail(Author, secureId.toInternal(args.id)),

    users: (rootValue: any, args: any, { connection }: Context) =>
      connection.manager.find(User),

    user: (rootValue: any, args: { id: string }, { connection }: Context) =>
      connection.manager.findOneOrFail(User, secureId.toInternal(args.id)),

    anything: (rootValue: any, args: { id: string }, { connection }: Context) =>
      findAnythingOrFail(args.id, connection)
  },

  Book: {
    id: (book: Book) => secureId.toExternal(book.id, "Book"),
    cover: (book: Book): Image => ({
      path: book.coverPath
    }),
    copies: (book: Book, args: any, { connection }: Context) =>
      connection.manager.find(BookCopy, { bookId: book.id })
  },

  Author: {
    id: (author: Author) => secureId.toExternal(author.id, "Author"),
    photo: (author: Author): Image => ({
      path: author.photoPath
    })
  },

  // TODO: Add ownedBookCopies
  // TODO: Add borrowedBookCopies
  User: {
    id: (user: User) => secureId.toExternal(user.id, "User")
  },

  Avatar: {
    image: (avatar: Avatar): Image => ({
      path: avatar.imagePath
    })
  },

  Image: {
    url: (image: Image, args: any, { assetsBaseUrl }: Context) =>
      assetsBaseUrl + image.path
  },

  Anything: {
    __resolveType: (anything: Author | Book | User | BookCopy) =>
      Object.getPrototypeOf(anything).constructor.name
  },

  BookCopy: {
    id: (user: User) => secureId.toExternal(user.id, "BookCopy"),

    owner: (bookCopy: BookCopy, args: any, { connection }: Context) =>
      connection.manager.findOneOrFail(User, { id: bookCopy.ownerId }),

    book: (bookCopy: BookCopy, args: any, { connection }: Context) =>
      connection.manager.findOneOrFail(Book, { id: bookCopy.bookId }),

    borrower: (bookCopy: BookCopy, args: any, { connection }: Context) =>
      connection.manager.findOne(User, { id: bookCopy.borrowerId })
  },

  Mutation: {
    updateBookFavourite: async (
      rootValue: any,
      args: { id: string; favourite: boolean },
      { connection }: Context
    ) => {
      const book = await connection.manager.findOneOrFail(
        Book,
        secureId.toInternal(args.id)
      );
      book.favourite = args.favourite;

      return connection.manager.save(book);
    }
  }
};
