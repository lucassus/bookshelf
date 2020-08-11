import { generateAuthToken } from "../../common/authentication";
import {
  AUTH_COOKIE_NAME,
  AUTH_TOKEN_EXPIRES_IN,
  Environment
} from "../../config";
import { UserRepository } from "../../database/repositories/UserRepository";
import { Context } from "../context";
import { Resolvers } from "../resolvers-types.generated";

const resolvers: Resolvers<Context> = {
  Query: {
    currentUser: (rootValue, arg, { currentUser }) => currentUser!
  },

  Mutation: {
    login: async (
      rootValue,
      { input: { email, password } },
      { res, connection }
    ) => {
      const userRepository = connection.getCustomRepository(UserRepository);
      const user = await userRepository.findByEmailAndPassword(email, password);

      if (!user) {
        return {
          success: false,
          message: "Invalid email or password!"
        };
      }

      const authToken = generateAuthToken(user);

      res.cookie(AUTH_COOKIE_NAME, authToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === Environment.production,
        maxAge: AUTH_TOKEN_EXPIRES_IN * 1000
      });

      return {
        success: true,
        message: "Login success!",
        currentUser: user
      };
    },

    logout: (rootValue, args, { res }) => {
      res.clearCookie(AUTH_COOKIE_NAME);

      return {
        success: true,
        message: "Logout success!"
      };
    }
  }
};

export default resolvers;
