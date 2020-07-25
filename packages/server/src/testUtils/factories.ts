import faker from "faker";
import { getManager, ObjectType, DeepPartial } from "typeorm";

import { hashPassword } from "../common/authentication";
import { titleizeSentence } from "../common/strings";
import { Author } from "../database/entity/Author";
import { Avatar, AVATAR_COLORS } from "../database/entity/Avatar";
import { Book } from "../database/entity/Book";
import { BookCopy } from "../database/entity/BookCopy";
import { User } from "../database/entity/User";

const AVATAR_IMAGES = [
  "/images/avatars/w13.png",
  "/images/avatars/m10.png",
  "/images/avatars/w2.png",
  "/images/avatars/m25.png"
];

const AUTHOR_PHOTOS = [
  "/images/book-authors/j-k-rowling.jpg",
  "/images/book-authors/james-s-a-corey.jpg",
  "/images/book-authors/andrzej-sapkowski.jpg"
];

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

function createEntity<Entity>(
  entityClass: ObjectType<Entity>,
  attributes: DeepPartial<Entity>
) {
  const manager = getManager();

  const entity = manager.create(entityClass, attributes);
  return manager.save(entity);
}

type CreateAvatarAttributes = Partial<Avatar>;

export function createAvatar(attributes: CreateAvatarAttributes = {}) {
  return createEntity(Avatar, {
    imagePath: faker.random.arrayElement(AVATAR_IMAGES),
    color: faker.random.arrayElement(AVATAR_COLORS),
    ...attributes
  });
}

type CreateUserAttributes = Partial<User> & {
  password?: string;
  avatarAttributes?: CreateAvatarAttributes;
};

export async function createUser(attributes: CreateUserAttributes = {}) {
  const { avatarAttributes, password, ...userAttributes } = attributes;

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

  if (avatarAttributes) {
    const avatar = await createAvatar(avatarAttributes);
    userAttributes.avatarId = avatar.id;
  }

  return createEntity(User, {
    passwordHash: hashPassword(password || "password"),
    isAdmin: false,
    ...userAttributes
  });
}

export function createAuthor(attributes: Partial<Author> = {}) {
  return createEntity(Author, {
    name: faker.name.findName(),
    bio: faker.lorem.sentence(),
    photoPath: faker.random.arrayElement(AUTHOR_PHOTOS),
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
    coverPath: faker.random.arrayElement(BOOK_COVERS),
    favourite: faker.random.boolean(),
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
