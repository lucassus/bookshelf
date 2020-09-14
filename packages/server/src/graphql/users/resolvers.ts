import { EntityNotFoundError } from "typeorm/error/EntityNotFoundError";

import { User } from "../../database/entity";
import { Context } from "../context";
import { Resolvers } from "../resolvers-types.generated";
import { UsersService } from "./UsersService";

const resolvers: Resolvers<Context> = {
  Avatar: {
    image: ({ imagePath: path }, args, { assetsBaseUrl }) => ({
      path,
      url: assetsBaseUrl + path
    })
  },

  Person: {
    avatar: (user) => {
      if (user.avatar.flagged) {
        return {
          __typename: "FlaggedAvatarError",
          message: "Avatar is flagged!"
        };
      }

      return { __typename: "Avatar", ...user.avatar };
    }
  },

  UserResult: {
    __resolveType: (maybeUser) => {
      if (maybeUser instanceof User) {
        return "User";
      }

      return "ResourceNotFoundError";
    }
  },

  Query: {
    users: (rootValue, args, { container }) =>
      container.get(UsersService).findAll(),

    user: async (rootValue, { id }, { container }) => {
      try {
        return await await container.get(UsersService).findByIdOrFail(id);
      } catch (error) {
        if (error instanceof EntityNotFoundError) {
          return { message: "Could not find User" };
        }

        throw error;
      }
    }
  },

  Mutation: {
    // TODO: Validate uniqueness of email, respond with validation errors
    createUser: async (rootValue, args, { container }) => {
      const { avatar: avatarAttributes, ...userAttributes } = args.input;

      const user = await container
        .get(UsersService)
        .create(userAttributes, avatarAttributes);

      return {
        success: true,
        message: "User was successfully created.",
        user
      };
    },

    // TODO: Validate uniqueness of email, respond with validation errors
    updateUser: async (rootValue, args, { container }) => {
      const { id, ...userAttributes } = args.input;

      const user = await container.get(UsersService).update(id, userAttributes);

      return {
        success: true,
        message: "User was successfully updated.",
        user
      };
    },

    deleteUser: async (rootValue, { id }, { container }) => {
      await container.get(UsersService).delete(id);

      return {
        success: true,
        message: "User was successfully deleted."
      };
    }
  }
};

export default resolvers;
