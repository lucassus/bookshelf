import { getCustomRepository, getManager } from "typeorm";

import { BookCopy } from "../entity/BookCopy";
import { User } from "../entity/User";
import { createBookCopy, createUser } from "../factories";
import { BookCopyRepository } from "./BookCopyRepository";

describe("BookCopyRepository", () => {
  describe(".borrow", () => {
    let borrower: User;
    let bookCopy: BookCopy;

    beforeEach(async () => {
      borrower = await createUser({
        name: "Bob",
        email: "bob@email.com"
      });

      bookCopy = await createBookCopy();
    });

    it("borrows a book", async () => {
      // When
      await getCustomRepository(BookCopyRepository).borrow(
        bookCopy.id,
        borrower.id
      );

      // Then
      const updatedBookCopy = await getManager().findOneOrFail(
        BookCopy,
        bookCopy.id
      );

      await expect(updatedBookCopy.borrower).resolves.toEqual(borrower);
    });

    it("raises an error when borrowing own book", async () => {
      await expect(
        getCustomRepository(BookCopyRepository).borrow(
          bookCopy.id,
          bookCopy.ownerId
        )
      ).rejects.toThrow("Cannot borrow own book.");
    });

    it("raises an error when the book is already borrowed", async () => {
      await getManager().update(BookCopy, bookCopy.id, {
        borrowerId: borrower.id
      });

      await expect(
        getCustomRepository(BookCopyRepository).borrow(bookCopy.id, borrower.id)
      ).rejects.toThrow(
        "Cannot borrow this book copy. It is already borrowed."
      );
    });
  });
});
