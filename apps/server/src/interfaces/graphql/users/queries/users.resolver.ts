import { UsersService } from "@/infra/services/UsersService";
import { Resolvers } from "@/types/resolvers.generated";

const usersResolver: Resolvers = {
  Query: {
    users: (rootValue, args, { container }) =>
      container.get(UsersService).findAll()
  }
};

export default usersResolver;
