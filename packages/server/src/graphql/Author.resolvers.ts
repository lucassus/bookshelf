import { Author } from "../database/entity/Author";
import { secureId } from "../database/helpers";
import { Resolvers } from "../resolvers-types.generated";
import { Context } from "../types";
import { id, image } from "./common";

export const resolvers: Resolvers<Context> = {
  Query: {
    authors: (rootValue, args, { connection }) =>
      connection.manager.find(Author),

    author: (rootValue, args, { authorsLoader }) =>
      authorsLoader.load(secureId.toInternal(args.id))
  },

  Author: {
    id,
    photo: image
  }
};
