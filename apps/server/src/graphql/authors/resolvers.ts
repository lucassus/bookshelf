import { Author } from "../../database/entity";
import { Resolvers } from "../resolvers-types.generated";
import { AuthorsService } from "./AuthorsService";

const resolvers: Resolvers = {
  Author: {
    __isTypeOf: (maybeAuthor) => {
      return maybeAuthor instanceof Author;
    },

    photo: ({ photoPath: path }, args, { assetsBaseUrl }) => ({
      path,
      url: assetsBaseUrl + path
    })
  },

  Query: {
    authors: (rootValue, args, { container }) =>
      container.get(AuthorsService).findAll(),

    author: async (rootValue, { id }, { authorsLoader }) => {
      const author = await authorsLoader.load(id);

      if (!author) {
        return {
          __typename: "ResourceNotFoundError",
          message: "Could not find Author"
        };
      }

      return author;
    }
  }
};

export default resolvers;
