import { clearAuthCookie, sendAuthCookie } from "../../common/authCookies";
import { generateAuthToken } from "../../common/authTokens";
import { Context } from "../context";
import { Resolvers } from "../resolvers-types.generated";
import {
  AuthenticationService,
  InvalidEmailOrPasswordError
} from "./AuthenticationService";

const resolvers: Resolvers<Context> = {
  Query: {
    currentUser: (rootValue, arg, { currentUser }) => currentUser!
  },

  Mutation: {
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

        const authToken = generateAuthToken(user);
        sendAuthCookie(res, authToken);

        return {
          success: true,
          message: "Login success!",
          currentUser: user
        };
      } catch (error) {
        if (error instanceof InvalidEmailOrPasswordError) {
          return {
            success: false,
            message: "Invalid email or password!"
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
