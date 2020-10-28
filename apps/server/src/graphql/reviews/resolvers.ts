import { Review } from "../../database/entity";
import { Resolvers } from "../resolvers-types.generated";

// TODO: Refactor these queries
export const resolvers: Resolvers = {
  Book: {
    averageRating: async (book, args, { connection }) => {
      const raw = await connection
        .getRepository(Review)
        .createQueryBuilder()
        .select("AVG(rating) AS avg")
        .where({ bookId: book.id })
        .getRawOne();

      return raw.avg;
    },

    reviewsCount: (book, args, { connection }) =>
      connection.getRepository(Review).count({
        where: { bookId: book.id }
      })
  }
};
