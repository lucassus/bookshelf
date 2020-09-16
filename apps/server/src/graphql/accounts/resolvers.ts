import { sendAuthCookie } from "../../common/authentication";
import { Context } from "../context";
import { Resolvers } from "../resolvers-types.generated";
import { UsersService } from "../users/UsersService";

const resolvers: Resolvers<Context> = {
  Query: {
    currentUser: (rootValue, arg, { currentUser }) => currentUser || null
  },

  Mutation: {
    register: async (rootValue, { input }, { container, res }) => {
      const service = container.get(UsersService);

      const emailNotTaken = await service.checkUniquenessOfEmail(input.email);

      if (emailNotTaken) {
        const user = await container.get(UsersService).register(input);

        sendAuthCookie(res, user);

        return {
          __typename: "RegistrationSuccess",
          currentUser: user
        };
      }

      return {
        __typename: "RegistrationFailure",
        validationErrors: [
          {
            path: "email",
            message: "The given email is already taken!"
          }
        ]
      };
    },

    updateProfile: async (
      rootValue,
      { input },
      { container, currentUser, res }
    ) => {
      const service = container.get(UsersService);

      const emailNotTaken = await service.checkUniquenessOfEmail(
        input.email,
        currentUser!
      );

      if (emailNotTaken) {
        const updatedCurrentUser = await service.update(currentUser!, input);
        sendAuthCookie(res, updatedCurrentUser);

        return {
          __typename: "UpdateProfileSuccess",
          currentUser: updatedCurrentUser
        };
      }

      return {
        __typename: "UpdateProfileFailure",
        validationErrors: [
          {
            path: "email",
            message: "The given email is already taken!"
          }
        ]
      };
    }
  }
};

export default resolvers;
