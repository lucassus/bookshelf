import { EntityNotFoundError } from "typeorm/error/EntityNotFoundError";

import { Context } from "../context";
import { Resolvers } from "../resolvers-types.generated";
import { UsersService } from "./UsersService";

const resolvers: Resolvers<Context> = {
  Query: {
    users: (rootValue, args, { container }) =>
      container.get(UsersService).findAll(),

    // TODO: Figure out how to dry up not found error handling
    // TODO: Use resolvers composition?
    user: async (rootValue, { id }, { container }) => {
      try {
        const user = await container.get(UsersService).findByIdOrFail(id);
        return Object.assign(user, { __typename: "User" });
      } catch (error) {
        if (error instanceof EntityNotFoundError) {
          return {
            __typename: "ResourceNotFoundError",
            message: error.message
          };
        }

        throw error;
      }
    }
  },

  Mutation: {
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
  },

  Avatar: {
    image: ({ imagePath: path }, args, { assetsBaseUrl }) => ({
      path,
      url: assetsBaseUrl + path
    })
  }
};

export default resolvers;
