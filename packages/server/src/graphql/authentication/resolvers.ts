import { generateAuthToken } from "../../common/authentication";
import { Context } from "../../common/types";
import { UserRepository } from "../../database/repositories/UserRepository";
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
      const user = await connection
        .getCustomRepository(UserRepository)
        .findByEmailAndPassword(email, password);

      const authToken = user ? generateAuthToken(user) : null;

      return {
        success: !!authToken,
        message: authToken ? "Login success!" : "Invalid email or password!",
        authToken
      };
    }
  }
};

export default resolvers;
