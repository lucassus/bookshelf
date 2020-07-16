import { getManager } from "typeorm";

import { Author } from "./entity/Author";
import { Book } from "./entity/Book";
import { User } from "./entity/User";

export const createUser = (attributes: Partial<User> = {}) => {
  const manager = getManager();

  return manager.save(
    manager.create(User, {
      name: "Alice",
      email: "alice@email.com",
      ...attributes
    })
  );
};

export const createAuthor = (attributes: Partial<Author> = {}) => {
  const manager = getManager();

  return manager.save(
    manager.create(Author, {
      name: "Andrzej Sapkowski",
      photoPath: "/images/book-authors/andrzej-sapkowski.jpg",
      ...attributes
    })
  );
};

export const createBook = async (attributes: Partial<Book> = {}) => {
  const manager = getManager();

  let { authorId } = attributes;
  if (authorId === undefined) {
    const author = await createAuthor();
    authorId = author.id;
  }

  return manager.save(
    manager.create(Book, {
      title: "Baptism of fire",
      coverPath: "/images/book-covers/witcher3.jpg",
      ...attributes,
      authorId
    })
  );
};
