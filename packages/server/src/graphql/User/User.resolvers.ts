import { User } from "../../database/entity/User";
import { secureId } from "../../database/helpers";
import { Context } from "../../types";
import { Resolvers } from "../resolvers-types.generated";

export const resolvers: Resolvers<Context> = {
  Query: {
    users: (rootValue, args, { connection }) => connection.manager.find(User),

    user: (rootValue, args, { connection }) =>
      connection.manager.findOneOrFail(User, secureId.toInternal(args.id))
  },

  Avatar: {
    image: ({ imagePath: path }, args, { assetsBaseUrl }) => ({
      path,
      url: assetsBaseUrl + path
    })
  }
};
