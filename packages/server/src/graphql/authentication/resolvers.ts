import {
  checkAuthentication,
  generateAuthToken,
  isPasswordValid
} from "../../auth";
import { User } from "../../database/entity/User";
import { Context } from "../../types";
import { Resolvers } from "../resolvers-types.generated";

export const resolvers: Resolvers<Context> = {
  Query: {
    me: (rootValue, arg, { currentUser }) => checkAuthentication(currentUser)
  },

  Mutation: {
    login: async (
      rootValue,
      { input: { email, password } },
      { connection }
    ) => {
      // TODO: Add some validations
      const user = await connection.manager.findOne(User, { email });

      if (user && isPasswordValid(password, user.passwordHash)) {
        const authToken = generateAuthToken(user);

        return {
          success: true,
          authToken
        };
      }

      return {
        success: false,
        token: null,
        message: "Invalid email or password!"
      };
    }
  }
};
