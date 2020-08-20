import { clearAuthCookie, sendAuthCookie } from "../../common/authentication";
import { Context } from "../context";
import { Resolvers } from "../resolvers-types.generated";
import { AuthenticationService } from "./AuthenticationService";

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
        const user = await service.findUserByEmailAndPassword(email, password);
        sendAuthCookie(res, user);

        return {
          success: true,
          message: "Login success!",
          currentUser: user
        };
      } catch {
        return {
          success: false,
          message: "Invalid email or password!"
        };
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
