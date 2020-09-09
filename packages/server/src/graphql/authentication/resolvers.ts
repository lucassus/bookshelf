import { QueryFailedError } from "typeorm";

import { clearAuthCookie, sendAuthCookie } from "../../common/authentication";
import { Context } from "../context";
import { Resolvers } from "../resolvers-types.generated";
import { UsersService } from "../users/UsersService";
import {
  AuthenticationService,
  InvalidEmailOrPasswordError
} from "./AuthenticationService";

const resolvers: Resolvers<Context> = {
  Query: {
    currentUser: (rootValue, arg, { currentUser }) => currentUser!
  },

  Mutation: {
    register: async (rootValue, { input }, { container }) => {
      try {
        const user = await container.get(UsersService).register(input);

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
