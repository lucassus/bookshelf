import { getManager } from "typeorm";

import { Author } from "./entity/Author";
import { Avatar } from "./entity/Avatar";
import { Book } from "./entity/Book";
import { BookCopy } from "./entity/BookCopy";
import { User } from "./entity/User";

export const createAvatar = (attributes: Partial<Avatar> = {}) => {
  const manager = getManager();

  return manager.save(
    manager.create(Avatar, {
      imagePath: "/images/avatars/w13.png",
      color: "yellow",
      ...attributes
    })
  );
};

export const createUser = async (
  attributes: Partial<User> = { name: "Alice" }
) => {
  const manager = getManager();

  const { ...userAttributes } = attributes;

  if (userAttributes.name && userAttributes.email === undefined) {
    userAttributes.email = `${userAttributes.name.toLocaleLowerCase()}@email.com`;
  }

  if (userAttributes.avatarId === undefined) {
    const avatar = await createAvatar();
    userAttributes.avatarId = avatar.id;
  }

  const user = manager.create(User, userAttributes);

  return manager.save(user);
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

export const createBook = async (
  attributes: Partial<Book> & { authorAttributes?: Partial<Author> } = {}
) => {
  const manager = getManager();

  const { authorAttributes, ...bookAttributes } = attributes;

  if (bookAttributes.authorId === undefined) {
    const author = await createAuthor(authorAttributes);
    bookAttributes.authorId = author.id;
  }

  return manager.save(
    manager.create(Book, {
      title: "Baptism of fire",
      coverPath: "/images/book-covers/witcher3.jpg",
      ...bookAttributes
    })
  );
};

export const createBookCopy = async (
  attributes: Partial<BookCopy> & {
    bookAttributes?: Partial<Book>;
  } & {
    ownerAttributes?: Partial<User>;
  } & { borrowerAttributes?: Partial<User> } = {}
) => {
  const manager = getManager();

  const {
    bookAttributes,
    ownerAttributes,
    borrowerAttributes,
    ...bookCopyAttributes
  } = attributes;

  if (bookCopyAttributes.bookId === undefined) {
    const book = await createBook(bookAttributes);
    bookCopyAttributes.bookId = book.id;
  }

  if (bookCopyAttributes.ownerId === undefined) {
    const owner = await createUser(ownerAttributes);
    bookCopyAttributes.ownerId = owner.id;
  }

  if (borrowerAttributes) {
    const borrower = await createUser(borrowerAttributes);
    bookCopyAttributes.borrowerId = borrower.id;
  }

  return manager.save(manager.create(BookCopy, bookCopyAttributes));
};
