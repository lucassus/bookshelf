import merge from "lodash.merge";

import { Context } from "../types";
import { Resolvers } from "./resolvers-types.generated";

export const resolvers: Resolvers<Context> = merge(
  {},
  require("./anything").resolvers,
  require("./authors").resolvers,
  require("./bookCopies").resolvers,
  require("./books").resolvers,
  require("./resources").resolvers,
  require("./users").resolvers
);
