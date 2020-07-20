import { mergeResolvers } from "@graphql-tools/merge";

import { Context } from "../types";
import { Resolvers } from "./resolvers-types.generated";

export const resolvers = mergeResolvers<Context, Resolvers<Context>>([
  require("./Anything").resolvers,
  require("./Author").resolvers,
  require("./Book").resolvers,
  require("./BookCopy").resolvers,
  require("./Resource").resolvers,
  require("./Timestampable").resolvers,
  require("./User").resolvers
]);
