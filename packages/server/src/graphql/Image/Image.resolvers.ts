import { Author } from "../../database/entity/Author";
import { Avatar } from "../../database/entity/Avatar";
import { Book } from "../../database/entity/Book";
import { Context } from "../../types";
import { Resolvers } from "../resolvers-types.generated";

export const resolvers: Resolvers<Context> = {
  WithImage: {
    __resolveType: (resource) =>
      Object.getPrototypeOf(resource).constructor.name,

    image: (resource, args, { assetsBaseUrl }) => {
      let path = "/default.jpg";

      if (resource instanceof Author) {
        path = resource.photoPath;
      }

      if (resource instanceof Avatar) {
        path = resource.imagePath;
      }

      if (resource instanceof Book) {
        path = resource.coverPath;
      }

      return {
        path,
        url: assetsBaseUrl + path
      };
    }
  }
};
