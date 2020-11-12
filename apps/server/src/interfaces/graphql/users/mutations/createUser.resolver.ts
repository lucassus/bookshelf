import { UsersService } from "~/infra/services/UsersService";
import { Resolvers } from "~/types/resolvers.generated";

const createUserResolver: Resolvers = {
  Mutation: {
    // TODO: Validate uniqueness of email, respond with validation errors
    createUser: async (rootValue, args, { container }) => {
      const { avatar: avatarAttributes, ...userAttributes } = args.input;

      const user = await container
        .get(UsersService)
        .create(userAttributes, avatarAttributes);

      return {
        success: true,
        message: "User was successfully created.",
        user
      };
    }
  }
};

export default createUserResolver;
