import { Author } from "@bookshelf/server/infra/database/entity";
import faker from "faker";

import { createEntity } from "./createEntity";

const AUTHOR_PHOTOS = [
  "/authors/JK%20Rowling.jpg",
  "/authors/James%20S.%20A.%20Corey.jpg",
  "/authors/Andrzej%20Sapkowski.jpg",
  "/authors/JRR%20Tolkien.jpg"
];

export type CreateAuthorAttributes = Partial<Author>;

export function createAuthor(
  attributes: CreateAuthorAttributes = {}
): Promise<Author> {
  return createEntity(Author, {
    name: faker.name.findName(),
    bio: faker.lorem.sentence(),
    photoPath: faker.random.arrayElement(AUTHOR_PHOTOS),
    ...attributes
  });
}
