import { Avatar } from "../../database/entity/Avatar";
import { User } from "../../database/entity/User";
import { secureId } from "../../database/helpers";
import { Context } from "../../types";
import { Resolvers } from "../resolvers-types.generated";

export const resolvers: Resolvers<Context> = {
  Query: {
    users: (rootValue, args, { connection }) => connection.manager.find(User),

    user: (rootValue, args, { connection }) =>
      connection.manager.findOneOrFail(User, args.id)
  },

  Mutation: {
    createUser: async (rootValue, args, { connection }) => {
      const { avatar: avatarAttributes, ...userAttributes } = args.input;

      const queryRunner = connection.createQueryRunner();
      await queryRunner.connect();

      try {
        await queryRunner.startTransaction();

        const avatar = queryRunner.manager.create(Avatar, avatarAttributes);
        await queryRunner.manager.save(avatar);

        const user = queryRunner.manager.create(User, {
          avatar,
          ...userAttributes
        });
        await queryRunner.manager.save(user);

        return user;
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
      } finally {
        await queryRunner.release();
      }
    },

    updateUser: async (rootValue, args, { connection }) => {
      const { id, ...userAttributes } = args.input;

      const user = await connection.manager.findOneOrFail(User, id);
      return connection.manager.save(
        connection.manager.merge(User, user, userAttributes)
      );
    },

    deleteUser: async (rootValue, { id }, { connection }) => {
      await connection.manager.delete(User, { id });

      return secureId.toExternal(id, "User");
    }
  },

  Avatar: {
    image: ({ imagePath: path }, args, { assetsBaseUrl }) => ({
      path,
      url: assetsBaseUrl + path
    })
  }
};
