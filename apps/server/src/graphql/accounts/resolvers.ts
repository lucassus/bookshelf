import { sendAuthCookie } from "../../common/authentication";
import { authenticateContext } from "../authentication/authenticateContext";
import { Context } from "../context";
import { Resolvers } from "../resolvers-types.generated";
import { UsersService } from "../users/UsersService";

const resolvers: Resolvers<Context> = {
  Query: {
    currentUser: (rootValue, arg, { currentUser }) => {
      if (!currentUser) {
        return { __typename: "GuestUser" };
      }

      return currentUser;
    }
  },

  Mutation: {
    register: async (rootValue, { input }, context) => {
      const service = context.container.get(UsersService);

      const emailNotTaken = await service.checkUniquenessOfEmail(input.email);

      if (emailNotTaken) {
        const user = await context.container.get(UsersService).register(input);

        authenticateContext(context, user);

        return Object.assign(user, { __typename: "ProtectedUser" });
      }

      return {
        __typename: "ValidationErrors",
        errors: [
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

        return Object.assign(updatedCurrentUser, {
          __typename: "ProtectedUser"
        });
      }

      return {
        __typename: "ValidationErrors",
        errors: [
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
