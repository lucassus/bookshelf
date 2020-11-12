import { UsersService } from "@/infra/services/UsersService";
import { Resolvers } from "@/types/resolvers.generated";
import { QueryFailedError } from "typeorm";
import { EntityNotFoundError } from "typeorm/error/EntityNotFoundError";

const updateUserResolver: Resolvers = {
  Mutation: {
    updateUser: async (rootValue, args, { container }) => {
      const { id, ...userAttributes } = args.input;

      try {
        const service = container.get(UsersService);

        const user = await service.findByIdOrFail(id);
        const updatedUser = await service.update(user, userAttributes);

        return updatedUser;
      } catch (error) {
        if (error instanceof EntityNotFoundError) {
          return {
            __typename: "ResourceNotFoundError",
            message: "Could not find User"
          };
        }

        if (
          error instanceof QueryFailedError &&
          error.message ===
            "SQLITE_CONSTRAINT: UNIQUE constraint failed: users.email"
        ) {
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

        throw error;
      }
    }
  }
};

export default updateUserResolver;
