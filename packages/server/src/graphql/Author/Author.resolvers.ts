import { Author } from "../../database/entity/Author";
import { secureId } from "../../database/helpers";
import { Context } from "../../types";
import { id, image } from "../common";
import { Resolvers } from "../resolvers-types.generated";

export const resolvers: Resolvers<Context> = {
  Query: {
    authors: (rootValue, args, { connection }) =>
      connection.manager.find(Author),

    author: (rootValue, args, { authorsLoader }) =>
      authorsLoader.load(secureId.toInternal(args.id))
  },

  Author: {
    id,
    photo: image,

    // TODO: Figure out how to dry it
    createdAt: (author) => author.createdAt.toISOString(),
    updatedAt: (author) => author.updatedAt.toISOString()
  }
};
