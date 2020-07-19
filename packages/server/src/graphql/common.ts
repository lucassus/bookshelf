import { Author } from "../database/entity/Author";
import { Avatar } from "../database/entity/Avatar";
import { Book } from "../database/entity/Book";
import { Context } from "../types";
import { Resolver, ResolversTypes } from "./resolvers-types.generated";

// TODO: Figure out how to refactor it with interface
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
