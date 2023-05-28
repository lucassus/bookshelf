import { faker } from "@faker-js/faker";

import { createEntity } from "./createEntity";
import { Author } from "~/infra/database/entity";

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
    name: faker.person.fullName(),
    bio: faker.lorem.sentence(),
    photoPath: faker.helpers.arrayElement(AUTHOR_PHOTOS),
    ...attributes
  });
}
