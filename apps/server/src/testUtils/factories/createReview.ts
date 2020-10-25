import faker from "faker";

import { Book, Review, User } from "../../database/entity";
import { createBook, CreateBookAttributes } from "./createBook";
import { createEntity } from "./createEntity";
import { createUser, CreateUserAttributes } from "./createUser";

type CreateReviewAttributes = Omit<Partial<Review>, "author" | "book"> & {
  book?: Book;
  bookAttributes?: CreateBookAttributes;
} & {
  author?: User;
  authorAttributes?: CreateUserAttributes;
};

export async function createReview(
  attributes: CreateReviewAttributes = {}
): Promise<Review> {
  const {
    book,
    bookAttributes,
    author,
    authorAttributes,
    ...reviewAttributes
  } = attributes;

  if (reviewAttributes.bookId === undefined) {
    reviewAttributes.bookId = book
      ? book.id
      : (await createBook(bookAttributes)).id;
  }

  if (reviewAttributes.authorId === undefined) {
    reviewAttributes.authorId = author
      ? author.id
      : (await createUser(authorAttributes)).id;
  }

  return createEntity(Review, {
    text: faker.lorem.paragraph(),
    rating: faker.random.number({
      min: 1,
      max: 10
    }),
    ...reviewAttributes
  });
}
