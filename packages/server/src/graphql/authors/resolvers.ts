import { EntityNotFoundError } from "typeorm/error/EntityNotFoundError";

import { Author } from "../../database/entity";
import { Context } from "../context";
import { Resolvers } from "../resolvers-types.generated";

const resolvers: Resolvers<Context> = {
  Query: {
    authors: (rootValue, args, { connection }) =>
      connection.getRepository(Author).find(),

    // TODO: Bring back dataloader?
    author: async (rootValue, { id }, { connection }) => {
      try {
        const author = await connection.getRepository(Author).findOneOrFail(id);
        return Object.assign(author, { __typename: "Author" });
      } catch (error) {
        if (error instanceof EntityNotFoundError) {
          return {
            __typename: "ResourceNotFoundError",
            message: `Could not find any entity of type "Author" matching: "${id}"`
          };
        }

        throw error;
      }
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
