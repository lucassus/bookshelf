import { BookRepository } from "../database/BookRepository";
import { Author } from "../database/entity/Author";
import { Avatar } from "../database/entity/Avatar";
import { Book } from "../database/entity/Book";
import { User } from "../database/entity/User";
import { Context } from "../server";

interface Image {
  path: string;
}

export const resolvers = {
  Book: {
    cover: (book: Book): Image => ({
      path: book.coverPath
    })
  },

  Author: {
    photo: (author: Author): Image => ({
      path: author.photoPath
    })
  },

  Avatar: {
    image: (avatar: Avatar): Image => ({
      path: avatar.imagePath
    })
  },

  Image: {
    url: (image: Image, args, context: Context) =>
      context.assetsBaseUrl + image.path
  },

  Query: {
    // TODO: It produces quite a lot of n+1 queries
    books: (rootValue, args, { connection }: Context) =>
      connection.manager.find(Book, { take: 9, relations: ["author"] }),
    randomBook: (rootValue, args, { connection }: Context) =>
      connection.getCustomRepository(BookRepository).findRandom(),

    authors: (rootValue, args, { connection }: Context) =>
      connection.manager.find(Author),
    author: (rootValue, args, { connection }: Context) =>
      connection.manager.findOneOrFail(Author, args.id),

    users: (rootValue, args, { connection }: Context) =>
      connection.manager.find(User)
  }
};
