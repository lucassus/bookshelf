import { generateAuthToken } from "../../common/authentication";
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
      { connection }
    ) => {
      const userRepository = connection.getCustomRepository(UserRepository);
      const user = await userRepository.findByEmailAndPassword(email, password);

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
