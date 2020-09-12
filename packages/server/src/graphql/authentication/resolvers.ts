import { QueryFailedError } from "typeorm";

import { clearAuthCookie, sendAuthCookie } from "../../common/authentication";
import { User } from "../../database/entity";
import { Context } from "../context";
import { Resolvers } from "../resolvers-types.generated";
import { UsersService } from "../users/UsersService";
import {
  AuthenticationService,
  InvalidEmailOrPasswordError
} from "./AuthenticationService";

const resolvers: Resolvers<Context> = {
  // TODO: Figure out how to dry it
  CurrentUser: {
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

  Query: {
    currentUser: (rootValue, arg, { currentUser }) => currentUser!
  },

  Mutation: {
    register: async (rootValue, { input }, { container, res }) => {
      try {
        const user = await container.get(UsersService).register(input);

        sendAuthCookie(res, user);

        return {
          __typename: "RegistrationSuccess",
          currentUser: user
        };
      } catch (error) {
        if (error instanceof QueryFailedError) {
          return {
            __typename: "RegistrationFailure",
            validationErrors: [
              {
                path: "email",
                message: "The given email is already taken!"
              }
            ]
          };
        }

        throw error;
      }
    },

    login: async (
      rootValue,
      { input: { email, password } },
      { res, container }
    ) => {
      const service = container.get(AuthenticationService);

      try {
        const user = await service.findUserByEmailAndPasswordOrFail(
          email,
          password
        );

        sendAuthCookie(res, user);

        return {
          __typename: "LoginSuccess",
          currentUser: user
        };
      } catch (error) {
        if (error instanceof InvalidEmailOrPasswordError) {
          return {
            __typename: "LoginFailure",
            validationErrors: [
              {
                path: "password",
                message: "Invalid email or password!"
              }
            ]
          };
        }

        throw error;
      }
    },

    // TODO: It should re-authenticate
    updateProfile: async (
      rootValue,
      { input },
      { connection, currentUser }
    ) => {
      // TODO: Validate uniqueness of email
      // TODO: Create a service
      const repository = connection.getRepository(User);
      const updatedCurrentUser = await repository.save(
        repository.merge(currentUser!, input)
      );

      return {
        __typename: "UpdateProfileSuccess",
        currentUser: updatedCurrentUser
      };
    },

    logout: (rootValue, args, { res }) => {
      clearAuthCookie(res);

      return {
        success: true,
        message: "Logout success!"
      };
    }
  }
};

export default resolvers;
