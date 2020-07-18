import faker from "faker";
import { getManager, ObjectType, DeepPartial } from "typeorm";

import { titleizeSentence } from "../strings";
import { Author } from "./entity/Author";
import { Avatar } from "./entity/Avatar";
import { Book } from "./entity/Book";
import { BookCopy } from "./entity/BookCopy";
import { User } from "./entity/User";

function createEntity<Entity>(
  entityClass: ObjectType<Entity>,
  attributes: DeepPartial<Entity>
) {
  const manager = getManager();
  const entity = manager.create(entityClass, attributes);

  return manager.save(entity);
}

export function createAvatar(attributes: Partial<Avatar> = {}) {
  return createEntity(Avatar, {
    imagePath: "/images/avatars/w13.png",
    color: faker.commerce.color(),
    ...attributes
  });
}

type CreateUserAttributes = Partial<User>;

export async function createUser(attributes: CreateUserAttributes = {}) {
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

  return createEntity(User, userAttributes);
}

export function createAuthor(attributes: Partial<Author> = {}) {
  return createEntity(Author, {
    name: faker.name.findName(),
    bio: faker.lorem.sentence(),
    photoPath: "/images/book-authors/andrzej-sapkowski.jpg",
    ...attributes
  });
}

type CreateBookAttributes = Partial<Book> & {
  authorAttributes?: Partial<Author>;
};

export async function createBook(attributes: CreateBookAttributes = {}) {
  const { authorAttributes, ...bookAttributes } = attributes;

  if (bookAttributes.authorId === undefined) {
    const author = await createAuthor(authorAttributes);
    bookAttributes.authorId = author.id;
  }

  return createEntity(Book, {
    title: titleizeSentence(
      faker.lorem.words(faker.random.number({ min: 1, max: 4 }))
    ),
    description: faker.lorem.sentence(),
    coverPath: "/images/book-covers/witcher3.jpg",
    ...bookAttributes
  });
}

export async function createBookCopy(
  attributes: Partial<BookCopy> & {
    bookAttributes?: CreateBookAttributes;
  } & {
    ownerAttributes?: CreateUserAttributes;
  } & { borrowerAttributes?: CreateUserAttributes } = {}
) {
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

  return createEntity(BookCopy, bookCopyAttributes);
}
