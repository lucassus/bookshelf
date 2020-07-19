import merge from "lodash.merge";

import { Resolvers } from "../resolvers-types.generated";
import { Context } from "../types";

export const resolvers: Resolvers<Context> = merge(
  {},
  require("./Anything.resolvers").resolvers,
  require("./Author.resolvers").resolvers,
  require("./Book.resolvers").resolvers,
  require("./BookCopy.resolvers").resolvers,
  require("./Resource.resolvers").resolvers,
  require("./User.resolvers").resolvers
);
