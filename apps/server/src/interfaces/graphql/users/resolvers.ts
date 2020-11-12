import { User } from "@/infra/database/entity";
import { Resolvers } from "@/types/resolvers.generated";

import { canSeeProtectedUserFields } from "./canSeeProtectedUserFields";

const resolvers: Resolvers = {
  Avatar: {
    image: ({ imagePath: path }, args, { assetsBaseUrl }) => ({
      path,
      url: assetsBaseUrl + path
    })
  },

  User: {
    __resolveType: (user, { currentUser }) => {
      if (currentUser && (currentUser.isAdmin || currentUser.id === user.id)) {
        return "ProtectedUser";
      }

      return "PublicUser";
    },

    avatar: (user) => {
      if (user.avatar.flagged) {
        return {
          __typename: "FlaggedAvatarError",
          message: "Avatar is flagged!"
        };
      }

      return Object.assign(user.avatar, { __typename: "Avatar" });
    }
  },

  PublicUser: {
    __isTypeOf: (user, { currentUser }) =>
      user instanceof User && !canSeeProtectedUserFields({ currentUser, user })
  },

  ProtectedUser: {
    __isTypeOf: (user, { currentUser }) =>
      user instanceof User && canSeeProtectedUserFields({ currentUser, user })
  }
};

export default resolvers;
