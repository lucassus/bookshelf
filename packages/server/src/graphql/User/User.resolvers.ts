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
    // TODO: Use input types
    // TODO: Refactor
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

    updateUser: async (rootValue, args, { connection }) => {
      const { id: externalId, ...userAttributes } = args;
      const id = secureId.toInternal(externalId);

      await connection.manager.update(User, { id }, userAttributes);

      const updatedUser = await connection.manager.findOneOrFail(User, id);
      return updatedUser;
    },

    // TODO: Refactor
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
