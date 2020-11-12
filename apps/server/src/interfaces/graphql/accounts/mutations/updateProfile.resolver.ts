import { UsersService } from "@/infra/services/UsersService";
import { sendAuthCookie } from "@/infra/support/authentication";
import { Resolvers } from "@/types/resolvers.generated";

const updateProfileResolver: Resolvers = {
  Mutation: {
    updateProfile: async (
      rootValue,
      { input },
      { container, currentUser, res }
    ) => {
      const service = container.get(UsersService);

      const emailNotTaken = await service.checkUniquenessOfEmail(
        input.email,
        currentUser
      );

      if (emailNotTaken) {
        const updatedCurrentUser = await service.update(currentUser, input);
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

export default updateProfileResolver;
