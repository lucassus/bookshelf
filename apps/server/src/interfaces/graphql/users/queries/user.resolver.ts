import { UsersService } from "@/infra/services/UsersService";
import { Resolvers } from "@/types/resolvers.generated";
import { EntityNotFoundError } from "typeorm/error/EntityNotFoundError";

const userResolver: Resolvers = {
  Query: {
    user: async (rootValue, { id }, { container }) => {
      try {
        return await container.get(UsersService).findByIdOrFail(id);
      } catch (error) {
        if (error instanceof EntityNotFoundError) {
          return {
            __typename: "ResourceNotFoundError",
            message: "Could not find User"
          };
        }

        throw error;
      }
    }
  }
};

export default userResolver;
