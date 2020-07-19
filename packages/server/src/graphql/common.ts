import { Author } from "../database/entity/Author";
import { Avatar } from "../database/entity/Avatar";
import { Book } from "../database/entity/Book";
import { secureId } from "../database/helpers";
import { Context } from "../types";
import { Resolver, ResolversTypes } from "./resolvers-types.generated";

export const id: Resolver<ResolversTypes["ID"], { id: number }> = (resource) =>
  secureId.toExternal(resource.id, resource.constructor.name);

export const image: Resolver<
  ResolversTypes["Image"],
  Avatar | Author | Book,
  Context
> = (rootValue, args, { assetsBaseUrl }) => {
  let path = "/default.jpg";

  if (rootValue instanceof Avatar) {
    path = rootValue.imagePath;
  }

  if (rootValue instanceof Author) {
    path = rootValue.photoPath;
  }

  if (rootValue instanceof Book) {
    path = rootValue.coverPath;
  }

  return {
    path,
    url: assetsBaseUrl + path
  };
};
