import faker from "faker";

import { titleizeSentence } from "../../common/strings";
import { Author } from "../../database/entity/Author";
import { Book } from "../../database/entity/Book";
import { createAuthor, CreateAuthorAttributes } from "./createAuthor";
import { createEntity } from "./createEntity";

const BOOK_COVERS = [
  "/images/book-covers/harry1.jpg",
  "/images/book-covers/harry2.jpg",
  "/images/book-covers/harry3.jpg",
  "/images/book-covers/harry4.jpg",
  "/images/book-covers/harry5.jpg",
  "/images/book-covers/harry6.jpg",
  "/images/book-covers/harry7.jpg",
  "/images/book-covers/expanse1.jpg",
  "/images/book-covers/expanse2.jpg",
  "/images/book-covers/expanse3.jpg",
  "/images/book-covers/expanse4.jpg",
  "/images/book-covers/expanse5.jpg",
  "/images/book-covers/expanse6.jpg",
  "/images/book-covers/expanse7.jpg",
  "/images/book-covers/expanse8.jpg",
  "/images/book-covers/witcher1.jpg",
  "/images/book-covers/witcher2.jpg",
  "/images/book-covers/witcher3.jpg",
  "/images/book-covers/witcher4.jpg",
  "/images/book-covers/witcher5.jpg"
];

export type CreateBookAttributes = Omit<Partial<Book>, "author"> & {
  author?: Author;
  authorAttributes?: CreateAuthorAttributes;
};

export async function createBook(
  attributes: CreateBookAttributes = {}
): Promise<Book> {
  const { author, authorAttributes, ...bookAttributes } = attributes;

  if (bookAttributes.authorId === undefined) {
    bookAttributes.authorId = author
      ? author.id
      : (await createAuthor(authorAttributes)).id;
  }

  return createEntity(Book, {
    title: titleizeSentence(
      faker.lorem.words(faker.random.number({ min: 1, max: 4 }))
    ),
    description: faker.lorem.sentence(),
    coverPath: faker.random.arrayElement(BOOK_COVERS),
    favourite: faker.random.boolean(),
    ...bookAttributes
  });
}
