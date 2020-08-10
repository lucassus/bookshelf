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

      if (!user) {
        return {
          success: false,
          message: "Invalid email or password!"
        };
      }

      const authToken = generateAuthToken(user);

      // TODO: Set cookie maxAge
      res.cookie("jid", authToken, { httpOnly: true });

      return {
        success: true,
        message: "Login success!"
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
