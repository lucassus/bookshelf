import { Review } from "../../database/entity";
import { Resolvers } from "../resolvers-types.generated";

export const resolvers: Resolvers = {
  Book: {
    averageRating: () => 0,

    reviewsCount: (book, args, { connection }) =>
      connection.getRepository(Review).count({
        where: { bookId: book.id }
      })
  }
};
