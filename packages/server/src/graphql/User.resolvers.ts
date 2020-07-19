import { User } from "../database/entity/User";
import { secureId } from "../database/helpers";
import { Resolvers } from "../resolvers-types.generated";
import { Context } from "../types";
import { id, image } from "./common";

export const resolvers: Resolvers<Context> = {
  Query: {
    users: (rootValue, args, { connection }) => connection.manager.find(User),

    user: (rootValue, args, { connection }) =>
      connection.manager.findOneOrFail(User, secureId.toInternal(args.id))
  },

  Avatar: { image },

  User: { id }
};
