import { Book } from "../../database/entity";
import { Resolvers } from "../resolvers-types.generated";

export const resolvers: Resolvers = {
  Book: {
    averageRating: () => 0,

    reviewsCount: (book, args, { connection }) =>
      connection.getRepository(Book).count({
        where: { bookId: book.id }
      })
  }
};
