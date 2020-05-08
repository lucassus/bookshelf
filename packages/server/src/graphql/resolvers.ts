import { Connection } from "typeorm";

import { BookRepository } from "../database/BookRepository";
import { Author } from "../database/entity/Author";
import { Avatar } from "../database/entity/Avatar";
import { Book } from "../database/entity/Book";
import { User } from "../database/entity/User";
import { secureId } from "../database/helpers";
import { Context } from "../server";

interface Image {
  path: string;
}

const findAnythingOrFail = (
  externalId: string,
  connection: Connection
): Promise<Author | Book | User> => {
  const [id, type] = secureId.toInternalAndType(externalId);

  if (type === "Author") {
    return connection.manager.findOneOrFail(Author, id);
  }

  if (type === "Book") {
    return connection.manager.findOneOrFail(Book, id);
  }

  if (type === "User") {
    return connection.manager.findOneOrFail(User, id);
  }

  throw Error(`Unknown type: ${type}`);
};

export const resolvers = {
  Book: {
    id: (book: Book) => secureId.toExternal(book.id, "Book"),
    cover: (book: Book): Image => ({
      path: book.coverPath
    })
  },

  Author: {
    id: (author: Author) => secureId.toExternal(author.id, "Author"),
    photo: (author: Author): Image => ({
      path: author.photoPath
    })
  },

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
    __resolveType: (anything: Author | Book | User) =>
      Object.getPrototypeOf(anything).constructor.name
  },

  // TODO: Figure out how to type the args
  Query: {
    booksCount: (rootValue: any, args: any, { connection }: Context) =>
      connection.manager.count(Book),

    // TODO: It produces quite a lot of n+1 queries
    books: async (
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
