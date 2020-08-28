import { Author } from "../../database/entity";
import { Context } from "../context";
import { Resolvers } from "../resolvers-types.generated";

const resolvers: Resolvers<Context> = {
  Author: {
    photo: ({ photoPath: path }, args, { assetsBaseUrl }) => ({
      path,
      url: assetsBaseUrl + path
    })
  },

  AuthorResponse: {
    __resolveType: (maybeAuthor) => {
      if (maybeAuthor instanceof Author) {
        return "Author";
      }

      return "ResourceNotFoundError";
    }
  },

  Query: {
    authors: (rootValue, args, { connection }) =>
      connection.getRepository(Author).find(),

    author: async (rootValue, { id }, { authorsLoader }) => {
      const author = await authorsLoader.load(id);

      if (!author) {
        return { message: "Could not find Author" };
      }

      return author;
    }
  }
};

export default resolvers;
