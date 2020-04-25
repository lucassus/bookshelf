import { Author } from "../entity/Author";
import { Avatar } from "../entity/Avatar";
import { Book } from "../entity/Book";
import { User } from "../entity/User";
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
    books: (rootValue, args, { connection }: Context) =>
      connection.manager.find(Book),
    randomBook: (rootValue, args, { connection }: Context) =>
      connection
        .getRepository(Book)
        .createQueryBuilder()
        .orderBy("RANDOM()")
        .limit(1)
        .getOne(),

    authors: (rootValue, args, { connection }: Context) =>
      connection.manager.find(Author),
    author: (rootValue, args, { connection }: Context) =>
      connection.manager.findOneOrFail(Author, args.id),

    users: (rootValue, args, { connection }: Context) =>
      connection.manager.find(User)
  }
};
