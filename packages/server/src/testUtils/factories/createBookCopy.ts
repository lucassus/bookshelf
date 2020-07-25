import { Book } from "../../database/entity/Book";
import { BookCopy } from "../../database/entity/BookCopy";
import { User } from "../../database/entity/User";
import { createBook, CreateBookAttributes } from "./createBook";
import { createEntity } from "./createEntity";
import { createUser, CreateUserAttributes } from "./createUser";

type CreateBookCopyAttributes = Omit<
  Partial<BookCopy>,
  "book" | "owner" | "borrower"
> & {
  book?: Book;
  bookAttributes?: CreateBookAttributes;
} & {
  owner?: User;
  ownerAttributes?: CreateUserAttributes;
} & { borrower?: User; borrowerAttributes?: CreateUserAttributes };

export async function createBookCopy(
  attributes: CreateBookCopyAttributes = {}
) {
  const {
    book,
    bookAttributes,
    owner,
    ownerAttributes,
    borrower,
    borrowerAttributes,
    ...bookCopyAttributes
  } = attributes;

  if (bookCopyAttributes.bookId === undefined) {
    bookCopyAttributes.bookId = book
      ? book.id
      : (await createBook(bookAttributes)).id;
  }

  if (bookCopyAttributes.ownerId === undefined) {
    bookCopyAttributes.ownerId = owner
      ? owner.id
      : (await createUser(ownerAttributes)).id;
  }

  if (borrower || borrowerAttributes) {
    bookCopyAttributes.borrowerId = borrower
      ? borrower.id
      : (await createUser(borrowerAttributes)).id;
  }

  return createEntity(BookCopy, bookCopyAttributes);
}
