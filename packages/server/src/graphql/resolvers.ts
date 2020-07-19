import merge from "lodash.merge";

import { Context } from "../types";
import { Resolvers } from "./resolvers-types.generated";

export const resolvers: Resolvers<Context> = merge(
  {},
  require("./anything/Anything.resolvers").resolvers,
  require("./authors/Author.resolvers").resolvers,
  require("./books/Book.resolvers").bookResolvers,
  require("./bookCopies/BookCopy.resolvers").resolvers,
  require("./resources/Resource.resolvers").resolvers,
  require("./users/User.resolvers").resolvers
);
