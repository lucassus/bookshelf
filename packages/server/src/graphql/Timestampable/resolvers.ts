import { Context } from "../../types";
import { Resolvers } from "../resolvers-types.generated";

export const resolvers: Resolvers<Context> = {
  Timestampable: {
    __resolveType: (timestampable) =>
      Object.getPrototypeOf(timestampable).constructor.name,

    createdAt: (timestampable) => timestampable.createdAt.toISOString(),
    updatedAt: (timestampable) => timestampable.updatedAt.toISOString()
  }
};
