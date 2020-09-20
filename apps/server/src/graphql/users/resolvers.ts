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

  User: {
    __resolveType: (user, { currentUser }) => {
      if (currentUser && (currentUser.isAdmin || currentUser.id === user.id)) {
        return "ClassifiedUser";
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
    // TODO: Improve it
    // The idea here being that IsTypeOf follows Open/Closed principle and ResolveType does not. I've found that ResolveType is a "gotcha" that people new to GraphQL run into.
    __isTypeOf: (user, info, { currentUser }) => {
      if (!currentUser) {
        return true;
      }

      if (currentUser.isAdmin) {
        return false;
      }

      return currentUser.id !== user.id;
    }
  },

  ClassifiedUser: {
    __isTypeOf: (user, info, { currentUser }) => {
      if (!currentUser) {
        return false;
      }

      return currentUser.isAdmin || currentUser.id === user.id;
    }
  },

  UserResult: {
    __resolveType: (maybeUser, { currentUser }) => {
      if (maybeUser instanceof User) {
        // TODO: Figure out how to dry it
        if (
          currentUser &&
          (currentUser.isAdmin || currentUser.id === maybeUser.id)
        ) {
          return "ClassifiedUser";
        }

        return "PublicUser";
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
