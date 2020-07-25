import { BookCopy } from "../../database/entity/BookCopy";
import { createBook, CreateBookAttributes } from "./createBook";
import { createEntity } from "./createEntity";
import { createUser, CreateUserAttributes } from "./createUser";

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
