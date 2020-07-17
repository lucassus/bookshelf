import faker from "faker";
import { getManager } from "typeorm";

import { titleizeSentence } from "../strings";
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
      color: faker.commerce.color(),
      ...attributes
    })
  );
};

type CreateUserAttributes = Partial<User>;

export const createUser = async (attributes: CreateUserAttributes = {}) => {
  const manager = getManager();

  const { ...userAttributes } = attributes;

  if (userAttributes.name === undefined) {
    userAttributes.name = faker.name.findName();
  }

  if (userAttributes.email === undefined) {
    userAttributes.email = faker.internet.email();
  }

  if (userAttributes.info === undefined) {
    userAttributes.info = faker.lorem.sentence();
  }

  if (userAttributes.avatarId === undefined) {
    const avatar = await createAvatar();
    userAttributes.avatarId = avatar.id;
  }

  return manager.save(manager.create(User, userAttributes));
};

export const createAuthor = (attributes: Partial<Author> = {}) => {
  const manager = getManager();

  return manager.save(
    manager.create(Author, {
      name: faker.name.findName(),
      bio: faker.lorem.sentence(),
      photoPath: "/images/book-authors/andrzej-sapkowski.jpg",
      ...attributes
    })
  );
};

type CreateBookAttributes = Partial<Book> & {
  authorAttributes?: Partial<Author>;
};

export const createBook = async (attributes: CreateBookAttributes = {}) => {
  const manager = getManager();

  const { authorAttributes, ...bookAttributes } = attributes;

  if (bookAttributes.authorId === undefined) {
    const author = await createAuthor(authorAttributes);
    bookAttributes.authorId = author.id;
  }

  return manager.save(
    manager.create(Book, {
      title: titleizeSentence(
        faker.lorem.words(faker.random.number({ min: 1, max: 4 }))
      ),
      description: faker.lorem.sentence(),
      coverPath: "/images/book-covers/witcher3.jpg",
      ...bookAttributes
    })
  );
};

export const createBookCopy = async (
  attributes: Partial<BookCopy> & {
    bookAttributes?: CreateBookAttributes;
  } & {
    ownerAttributes?: CreateUserAttributes;
  } & { borrowerAttributes?: CreateUserAttributes } = {}
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
