import { EntityNotFoundError } from "typeorm/error/EntityNotFoundError";

import { User } from "../../database/entity";
import { Context } from "../context";
import { Resolvers } from "../resolvers-types.generated";
import { UsersService } from "./UsersService";

// TODO: Refactor it
const isPrivileged = (user: User, currentUser: User | undefined) => {
  if (!currentUser) {
    return false;
  }

  return currentUser.isAdmin || currentUser.id === user.id;
};

const resolvers: Resolvers<Context> = {
  Avatar: {
    image: ({ imagePath: path }, args, { assetsBaseUrl }) => ({
      path,
      url: assetsBaseUrl + path
    })
  },

  User: {
    avatar: (user) => {
      if (user.avatar.flagged) {
        return {
          __typename: "FlaggedAvatarError",
          message: "Avatar is flagged!"
        };
      }

      return { __typename: "Avatar", ...user.avatar };
    },

    // Resolvers for privileged fields

    isAdmin: (user, args, { currentUser }) =>
      isPrivileged(user, currentUser) ? user.isAdmin : null,

    email: (user, args, { currentUser }) =>
      isPrivileged(user, currentUser) ? user.email : null,

    borrowedBookCopies: (user, args, { currentUser }) =>
      isPrivileged(user, currentUser) ? user.borrowedBookCopies : null
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
        return await container.get(UsersService).findByIdOrFail(id);
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

      const service = container.get(UsersService);
      const user = await service.findByIdOrFail(id);
      const updatedUser = await service.update(user, userAttributes);

      return {
        success: true,
        message: "User was successfully updated.",
        user: updatedUser
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
