import { Avatar } from "../../database/entity/Avatar";
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

  Mutation: {
    createUser: async (rootValue, args, { connection }) => {
      const { avatarImagePath, avatarColor, ...userAttributes } = args;

      const avatar = await connection.manager.save(
        connection.manager.create(Avatar, {
          imagePath: avatarImagePath,
          color: avatarColor
        })
      );

      return connection.manager.save(
        connection.manager.create(User, {
          avatar,
          ...userAttributes
        })
      );
    },
    deleteUser: async (rootValue, args, { connection }) => {
      await connection.manager.delete(User, {
        id: secureId.toInternal(args.id)
      });

      return args.id;
    }
  },

  Avatar: {
    image: ({ imagePath: path }, args, { assetsBaseUrl }) => ({
      path,
      url: assetsBaseUrl + path
    })
  }
};
