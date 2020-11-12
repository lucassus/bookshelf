import { UsersService } from "../../../../infra/services/UsersService";
import { Resolvers } from "../../../../types/resolvers.generated";

const deleteUserResolver: Resolvers = {
  Mutation: {
    deleteUser: async (rootValue, { id }, { container }) => {
      await container.get(UsersService).delete(id);

      return {
        success: true,
        message: "User was successfully deleted."
      };
    }
  }
};

export default deleteUserResolver;
