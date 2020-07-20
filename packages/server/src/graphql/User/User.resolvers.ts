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
      const { avatar: avatarAttributes, ...userAttributes } = args.input;

      const queryRunner = connection.createQueryRunner();

      try {
        await queryRunner.startTransaction();

        const avatar = connection.manager.create(Avatar, avatarAttributes);
        await connection.manager.save(avatar);

        const user = connection.manager.create(User, {
          avatar,
          ...userAttributes
        });
        await connection.manager.save(user);

        return user;
      } catch {
        await queryRunner.rollbackTransaction();
        return null;
      } finally {
        await queryRunner.release();
      }
    },

    updateUser: async (rootValue, args, { connection }) => {
      const { id: externalId, ...userAttributes } = args.input;
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
