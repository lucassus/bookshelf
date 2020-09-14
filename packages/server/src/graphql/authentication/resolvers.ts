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
  Query: {
    currentUser: (rootValue, arg, { currentUser }) => currentUser || null
  },

  // TODO: Lots of todos here
  Mutation: {
    register: async (rootValue, { input }, { container, res }) => {
      const service = container.get(UsersService);

      const emailNotTaken = await service.checkUniquenessOfEmail(input.email);

      if (emailNotTaken) {
        const user = await container.get(UsersService).register(input);

        sendAuthCookie(res, user);

        return {
          __typename: "RegistrationSuccess",
          currentUser: user
        };
      }

      return {
        __typename: "RegistrationFailure",
        validationErrors: [
          {
            path: "email",
            message: "The given email is already taken!"
          }
        ]
      };
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

    // TODO: Is there an option for making currentUSer not nullable?
    updateProfile: async (
      rootValue,
      { input },
      { container, connection, currentUser, res }
    ) => {
      // TODO: Use a service
      const service = container.get(UsersService);
      const repository = connection.getRepository(User);

      const emailNotTaken = await service.checkUniquenessOfEmail(
        input.email,
        currentUser!
      );

      if (emailNotTaken) {
        const updatedCurrentUser = await repository.save(
          repository.merge(currentUser!, input)
        );

        sendAuthCookie(res, updatedCurrentUser);

        return {
          __typename: "UpdateProfileSuccess",
          currentUser: updatedCurrentUser
        };
      }

      return {
        __typename: "UpdateProfileFailure",
        validationErrors: [
          {
            path: "email",
            message: "The given email is already taken!"
          }
        ]
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
