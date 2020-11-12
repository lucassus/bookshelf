import { UsersService } from "../../../../infra/services/UsersService";
import { Resolvers } from "../../../../types/resolvers.generated";
import { authenticateContext } from "../../authentication/authenticateContext";

const registerResolver: Resolvers = {
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
    }
  }
};

export default registerResolver;
