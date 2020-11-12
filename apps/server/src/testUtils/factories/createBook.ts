import { titleizeSentence } from "@bookshelf/string-utils";
import faker from "faker";

import { Author, Book } from "../../infra/database/entity";
import { createAuthor, CreateAuthorAttributes } from "./createAuthor";
import { createEntity } from "./createEntity";

const BOOK_COVERS = [
  "/covers/harry1.jpg",
  "/covers/harry2.jpg",
  "/covers/harry3.jpg",
  "/covers/harry4.jpg",
  "/covers/harry5.jpg",
  "/covers/harry6.jpg",
  "/covers/harry7.jpg",
  "/covers/expanse1.jpg",
  "/covers/expanse2.jpg",
  "/covers/expanse3.jpg",
  "/covers/expanse4.jpg",
  "/covers/expanse5.jpg",
  "/covers/expanse6.jpg",
  "/covers/expanse7.jpg",
  "/covers/expanse8.jpg",
  "/covers/witcher1.jpg",
  "/covers/witcher2.jpg",
  "/covers/witcher3.jpg",
  "/covers/witcher4.jpg",
  "/covers/witcher5.jpg"
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
    ...bookAttributes
  });
}
