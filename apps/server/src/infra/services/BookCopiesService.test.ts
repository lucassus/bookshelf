import { Container } from "typedi";
import { getManager } from "typeorm";

import { BookCopy } from "../database/entity";
import { createBookCopy, createUser } from "../factories";
import { BookCopiesService } from "./BookCopiesService";

describe("BookCopiesService", () => {
  let service: BookCopiesService;

  beforeEach(() => {
    service = Container.get(BookCopiesService);
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
      const now = new Date(Date.UTC(2020, 9, 8, 11, 45));
      await service.borrow(bookCopy.id, borrower.id, now);

      // Then
      const updatedBookCopy = await getManager().findOneOrFail(
        BookCopy,
        bookCopy.id
      );

      await expect(updatedBookCopy.borrower).resolves.toMatchObject({
        id: borrower.id,
        name: borrower.name
      });
      expect(updatedBookCopy.borrowedAt).not.toBe(null);
      expect(updatedBookCopy.borrowedAt!.getTime()).toBe(now.getTime());
    });

    it("raises an error when borrowing own book", async () => {
      // Given
      const { bookCopy } = await loadFixtures();

      // Then
      await expect(
        service.borrow(bookCopy.id, bookCopy.ownerId)
      ).rejects.toThrow("Cannot borrow own book.");
    });

    it("raises an error when the book is already borrowed", async () => {
      // Given
      const { bookCopy, borrower } = await loadFixtures();
      await service.borrow(bookCopy.id, borrower.id);

      // Then
      await expect(service.borrow(bookCopy.id, borrower.id)).rejects.toThrow(
        "Cannot borrow this book copy. It is already borrowed."
      );
    });
  });

  test(".return", async () => {
    // Given
    const { bookCopy, borrower } = await loadFixtures();
    await service.borrow(bookCopy.id, borrower.id);

    // When
    await service.return(bookCopy.id, borrower.id);

    // Then
    const updatedBookCopy = await getManager().findOneOrFail(
      BookCopy,
      bookCopy.id
    );

    expect(updatedBookCopy.borrowerId).toBe(null);
    expect(updatedBookCopy.borrowedAt).toBe(null);
  });
});
