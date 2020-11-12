import { Resolvers } from "../../../types/resolvers.generated";
import { ReviewsService } from "./ReviewsService";

export const resolvers: Resolvers = {
  Book: {
    averageRating: async (book, args, { container }) =>
      container.get(ReviewsService).getAverageRating(book.id),

    reviewsCount: (book, args, { container }) =>
      container.get(ReviewsService).countReviews(book.id)
  },

  Review: {
    author: (review, args, { usersLoader }) => usersLoader.load(review.authorId)
  },

  Mutation: {
    createReview: (rootValue, args, { currentUser, container }) => {
      const { bookId, rating, text } = args.input;

      return container.get(ReviewsService).create({
        authorId: currentUser.id,
        bookId: Number(bookId),
        rating,
        text
      });
    }
  }
};
