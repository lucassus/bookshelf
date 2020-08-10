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
      { res, connection }
    ) => {
      const userRepository = connection.getCustomRepository(UserRepository);
      const user = await userRepository.findByEmailAndPassword(email, password);

      const authToken = user ? generateAuthToken(user) : null;

      // TODO: Set cookie maxAge
      res.cookie("jid", authToken, { httpOnly: true });

      return {
        success: !!authToken,
        message: authToken ? "Login success!" : "Invalid email or password!"
      };
    },

    logout: (rootValue, args, { res }) => {
      res.clearCookie("jid");

      return {
        success: true,
        message: "Logout success!"
      };
    }
  }
};

export default resolvers;
