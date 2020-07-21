import { Author } from "../../database/entity/Author";
import { Context } from "../../types";
import { Resolvers } from "../resolvers-types.generated";

export const resolvers: Resolvers<Context> = {
  Query: {
    authors: (rootValue, args, { connection }) =>
      connection.manager.find(Author),

    author: (rootValue, args, { authorsLoader }) => {
      return authorsLoader.load(args.id);
    }
  },

  Author: {
    photo: ({ photoPath: path }, args, { assetsBaseUrl }) => ({
      path,
      url: assetsBaseUrl + path
    })
  }
};
