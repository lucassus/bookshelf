import {
  generateAuthToken,
  isPasswordValid
} from "../../common/authentication";
import { Context } from "../../common/types";
import { User } from "../../database/entity/User";
import { Resolvers } from "../resolvers-types.generated";

const resolvers: Resolvers<Context> = {
  Query: {
    me: (rootValue, arg, { currentUser }) => currentUser!
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
          message: "Login success!",
          authToken
        };
      }

      return {
        success: false,
        message: "Invalid email or password!",
        token: null
      };
    }
  }
};

export default resolvers;
