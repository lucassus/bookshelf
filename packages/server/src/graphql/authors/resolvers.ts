import { Author } from "../../database/entity";
import { Context } from "../context";
import { Resolvers } from "../resolvers-types.generated";

const resolvers: Resolvers<Context> = {
  Query: {
    authors: (rootValue, args, { connection }) =>
      connection.manager.find(Author),

    author: async (rootValue, { id }, { authorsLoader }) => {
      const author = await authorsLoader.load(id);

      if (!author) {
        return {
          __typename: "AuthorNotFoundError",
          message: `Could not find any entity of type "Author" matching: "${id}"`
        };
      }

      return Object.assign(author, { __typename: "Author" });
    }
  },

  Author: {
    photo: ({ photoPath: path }, args, { assetsBaseUrl }) => ({
      path,
      url: assetsBaseUrl + path
    })
  }
};

export default resolvers;
