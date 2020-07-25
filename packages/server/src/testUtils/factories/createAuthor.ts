import faker from "faker";

import { Author } from "../../database/entity/Author";
import { createEntity } from "./createEntity";

const AUTHOR_PHOTOS = [
  "/images/book-authors/j-k-rowling.jpg",
  "/images/book-authors/james-s-a-corey.jpg",
  "/images/book-authors/andrzej-sapkowski.jpg"
];

export type CreateAuthorAttributes = Partial<Author>;

export function createAuthor(attributes: CreateAuthorAttributes = {}) {
  return createEntity(Author, {
    name: faker.name.findName(),
    bio: faker.lorem.sentence(),
    photoPath: faker.random.arrayElement(AUTHOR_PHOTOS),
    ...attributes
  });
}
