import { Author } from "../database/entity/Author";
import { Avatar } from "../database/entity/Avatar";
import { Book } from "../database/entity/Book";
import { BookCopy } from "../database/entity/BookCopy";
import { User } from "../database/entity/User";
import { findAnythingOrFail } from "../database/findAnythingOrFail";
import { secureId } from "../database/helpers";
import { BookCopyRepository } from "../database/repositories/BookCopyRepository";
import { BookRepository } from "../database/repositories/BookRepository";
import { ResolverMap } from "../types";

interface Image {
  path: string;
}

export const resolvers: ResolverMap = {
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
      findAnythingOrFail(args.id, connection)
  },

  Book: {
    id: (book: Book) => secureId.toExternal(book.id, "Book"),
    cover: (book: Book): Image => ({
      path: book.coverPath
    }),
    author: (book: Book, args, { authorsLoader }) =>
      authorsLoader.load(book.authorId)
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
    url: (image: Image, args, { assetsBaseUrl }) => assetsBaseUrl + image.path
  },

  Anything: {
    __resolveType: (anything: Author | Book | User | BookCopy) =>
      Object.getPrototypeOf(anything).constructor.name
  },

  BookCopy: {
    id: (user: User) => secureId.toExternal(user.id, "BookCopy")
  },

  Mutation: {
    borrowBookCopy: async (rootValue, args: { id: string }, { connection }) => {
      const id = secureId.toInternal(args.id);

      // TODO: Refactor
      const user = await connection.manager.findOneOrFail(User, {
        name: "Bob"
      });

      return connection.manager
        .getCustomRepository(BookCopyRepository)
        .borrow(id, user.id);
    },

    updateBookFavourite: async (
      rootValue,
      args: { id: string; favourite: boolean },
      { connection }
    ) => {
      const id = secureId.toInternal(args.id);

      return connection.manager
        .getCustomRepository(BookRepository)
        .updateFavourite(id, args.favourite);
    }
  }
};
