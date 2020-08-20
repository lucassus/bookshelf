import { Context } from "../context";
import { Resolvers } from "../resolvers-types.generated";
import { UsersService } from "./UsersService";

const resolvers: Resolvers<Context> = {
  Query: {
    users: (rootValue, args, { injector }) =>
      injector.get(UsersService).findAll(),

    user: (rootValue, { id }, { injector }) =>
      injector.get(UsersService).findByIdOrFail(id)
  },

  Mutation: {
    createUser: async (rootValue, args, { injector }) => {
      const { avatar: avatarAttributes, ...userAttributes } = args.input;

      const user = await injector
        .get(UsersService)
        .create(userAttributes, avatarAttributes);

      return {
        success: true,
        message: "User was successfully created.",
        user
      };
    },

    updateUser: async (rootValue, args, { injector }) => {
      const { id, ...userAttributes } = args.input;

      const user = await injector.get(UsersService).update(id, userAttributes);

      return {
        success: true,
        message: "User was successfully updated.",
        user
      };
    },

    deleteUser: async (rootValue, { id }, { injector }) => {
      await injector.get(UsersService).delete(id);

      return {
        success: true,
        message: "User was successfully deleted."
      };
    }
  },

  Avatar: {
    image: ({ imagePath: path }, args, { assetsBaseUrl }) => ({
      path,
      url: assetsBaseUrl + path
    })
  }
};

export default resolvers;
