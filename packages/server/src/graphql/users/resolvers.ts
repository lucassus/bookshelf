import {
  checkAdminAuthentication,
  checkAuthentication,
  generateAuthToken,
  hashPassword,
  isPasswordValid
} from "../../common/authentication";
import { secureId } from "../../common/secureId";
import { Context } from "../../common/types";
import { Avatar } from "../../database/entity/Avatar";
import { User } from "../../database/entity/User";
import { Resolvers } from "../resolvers-types.generated";

export const resolvers: Resolvers<Context> = {
  Query: {
    me: (rootValue, arg, { currentUser }) => checkAuthentication(currentUser),

    users: (rootValue, args, { connection }) => connection.manager.find(User),

    user: (rootValue, { id }, { connection }) =>
      connection.manager.findOneOrFail(User, id)
  },

  Mutation: {
    login: async (
      rootValue,
      { input: { email, password } },
      { connection }
    ) => {
      // TODO: Add validations
      const user = await connection.manager.findOne(User, { email });

      // TODO: Add a test for invalid email
      if (user && isPasswordValid(password, user.passwordHash)) {
        const authToken = generateAuthToken(user);

        return {
          success: true,
          authToken
        };
      }

      return {
        success: false,
        token: null,
        message: "Invalid email or password!"
      };
    },

    createUser: async (rootValue, args, { connection, currentUser }) => {
      checkAdminAuthentication(currentUser);
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

        return user;
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
      } finally {
        await queryRunner.release();
      }
    },

    updateUser: async (rootValue, args, { connection, currentUser }) => {
      checkAdminAuthentication(currentUser);
      const { id, ...userAttributes } = args.input;

      const user = await connection.manager.findOneOrFail(User, id);
      return connection.manager.save(
        connection.manager.merge(User, user, userAttributes)
      );
    },

    deleteUser: async (rootValue, { id }, { connection, currentUser }) => {
      checkAdminAuthentication(currentUser);
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
