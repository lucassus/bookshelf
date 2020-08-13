import { hashPassword } from "../../common/passwords";
import { Avatar, User } from "../../database/entity";
import { Context } from "../context";
import { Resolvers } from "../resolvers-types.generated";

const resolvers: Resolvers<Context> = {
  Query: {
    users: (rootValue, args, { connection }) =>
      connection.getRepository(User).find({ order: { name: "ASC" } }),

    user: (rootValue, { id }, { connection }) =>
      connection.manager.findOneOrFail(User, id)
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

        // TODO: Add validations for userAttributes, like email, password min length etc
        const user = queryRunner.manager.create(User, {
          ...userAttributes,
          passwordHash: hashPassword(userAttributes.password),
          avatar
        });
        await queryRunner.manager.save(user);

        return {
          success: true,
          message: "User was successfully created.",
          user
        };
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
      await connection.manager.save(
        connection.manager.merge(User, user, userAttributes)
      );

      return {
        success: true,
        message: "User was successfully updated.",
        user
      };
    },

    deleteUser: async (rootValue, { id }, { connection }) => {
      await connection.manager.delete(User, { id });

      return {
        success: true,
        message: "User was successfully deleted."
      };
    }
  },

  Avatar: {
    image: ({ imagePath: path }, args, { assetsBaseUrl }) => ({
      path,
      url: assetsBaseUrl + path
    })
  }
};

export default resolvers;
