import { EntityNotFoundError } from "typeorm/error/EntityNotFoundError";

import { User } from "../../database/entity";
import { Context } from "../context";
import { Resolvers } from "../resolvers-types.generated";
import { canSeeProtectedUserFields } from "./canSeeProtectedUserFields";
import { UsersService } from "./UsersService";

const resolvers: Resolvers<Context> = {
  Avatar: {
    image: ({ imagePath: path }, args, { assetsBaseUrl }) => ({
      path,
      url: assetsBaseUrl + path
    })
  },

  User: {
    __resolveType: (user, { currentUser }) => {
      if (currentUser && (currentUser.isAdmin || currentUser.id === user.id)) {
        return "ProtectedUser";
      }

      return "PublicUser";
    },

    avatar: (user) => {
      if (user.avatar.flagged) {
        return {
          __typename: "FlaggedAvatarError",
          message: "Avatar is flagged!"
        };
      }

      return Object.assign(user.avatar, { __typename: "Avatar" });
    }
  },

  PublicUser: {
    __isTypeOf: (user, { currentUser }) =>
      user instanceof User && !canSeeProtectedUserFields({ currentUser, user })
  },

  ProtectedUser: {
    __isTypeOf: (user, { currentUser }) =>
      user instanceof User && canSeeProtectedUserFields({ currentUser, user })
  },

  Query: {
    users: (rootValue, args, { container }) =>
      container.get(UsersService).findAll(),

    user: async (rootValue, { id }, { container }) => {
      try {
        return await container.get(UsersService).findByIdOrFail(id);
      } catch (error) {
        if (error instanceof EntityNotFoundError) {
          return {
            __typename: "ResourceNotFoundError",
            message: "Could not find User"
          };
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

      try {
        const service = container.get(UsersService);
        const user = await service.findByIdOrFail(id);
        const updatedUser = await service.update(user, userAttributes);

        return updatedUser;
      } catch (error) {
        if (error instanceof EntityNotFoundError) {
          return {
            __typename: "ResourceNotFoundError",
            message: "Could not find User"
          };
        }

        throw error;
      }
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
