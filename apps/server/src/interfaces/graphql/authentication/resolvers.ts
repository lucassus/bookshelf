import { authenticateContext } from "./authenticateContext";
import {
  AuthenticationService,
  InvalidEmailOrPasswordError
} from "~/infra/services/AuthenticationService";
import { clearAuthCookie } from "~/infra/support/authentication";
import { Resolvers } from "~/types/resolvers.generated";

const resolvers: Resolvers = {
  Mutation: {
    login: async (rootValue, { input: { email, password } }, context) => {
      const service = context.container.get(AuthenticationService);

      try {
        const user = await service.findUserByEmailAndPasswordOrFail(
          email,
          password
        );

        authenticateContext(context, user);

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
      return true;
    }
  }
};

export default resolvers;
