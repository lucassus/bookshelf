import { getCustomRepository, getManager } from "typeorm";

import { createBookCopy, createUser } from "../../testUtils/factories";
import { BookCopy } from "../entity/BookCopy";
import { BookCopyRepository } from "./BookCopyRepository";

describe("BookCopyRepository", () => {
  let repository: BookCopyRepository;

  beforeEach(() => {
    repository = getCustomRepository(BookCopyRepository);
  });

  const loadFixtures = async () => {
    return {
      bookCopy: await createBookCopy(),
      borrower: await createUser({ name: "Bob", email: "bob@email.com" })
    };
  };

  describe(".borrow", () => {
    it("borrows a book", async () => {
      // Given
      const { bookCopy, borrower } = await loadFixtures();

      // When
      await repository.borrow(bookCopy.id, borrower.id);

      // Then
      const updatedBookCopy = await getManager().findOneOrFail(
        BookCopy,
        bookCopy.id
      );

      await expect(updatedBookCopy.borrower).resolves.toMatchObject({
        id: borrower.id,
        name: borrower.name
      });
    });

    it("raises an error when borrowing own book", async () => {
      // Given
      const { bookCopy } = await loadFixtures();

      // Then
      await expect(
        repository.borrow(bookCopy.id, bookCopy.ownerId)
      ).rejects.toThrow("Cannot borrow own book.");
    });

    it("raises an error when the book is already borrowed", async () => {
      // Given
      const { bookCopy, borrower } = await loadFixtures();
      await repository.borrow(bookCopy.id, borrower.id);

      // Then
      await expect(
        getCustomRepository(BookCopyRepository).borrow(bookCopy.id, borrower.id)
      ).rejects.toThrow(
        "Cannot borrow this book copy. It is already borrowed."
      );
    });
  });

  test(".return", async () => {
    // Given
    const { bookCopy, borrower } = await loadFixtures();
    await repository.borrow(bookCopy.id, borrower.id);

    // When
    await repository.return(bookCopy.id, borrower.id);

    // Then
    const updatedBookCopy = await getManager().findOneOrFail(
      BookCopy,
      bookCopy.id
    );
    expect(updatedBookCopy.borrowerId).toBeNull();
  });
});
