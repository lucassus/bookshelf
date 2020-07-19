import merge from "lodash.merge";

import { Context } from "../types";
import { Resolvers } from "./resolvers-types.generated";

export const resolvers: Resolvers<Context> = merge(
  {},
  require("./Anything").resolvers,
  require("./Author").resolvers,
  require("./Book").resolvers,
  require("./BookCopy").resolvers,
  require("./Image").resolvers,
  require("./Resource").resolvers,
  require("./Timestampable").resolvers,
  require("./User").resolvers
);
