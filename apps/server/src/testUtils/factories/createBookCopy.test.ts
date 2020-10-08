import { createBookCopy } from "./createBookCopy";
import { createUser } from "./createUser";

describe(".createBookCopy", () => {
  it("creates borrowed book copy with borrowedAt date", async () => {
    const borrower = await createUser();
    const bookCopy = await createBookCopy({
      borrower
    });

    expect(bookCopy.borrowedAt).not.toBe(null);
  });

  it("creates borrowed book copy with given borrowedAt date", async () => {
    const borrower = await createUser();
    const borrowedAt = new Date(2020, 9, 7, 12, 15);
    const bookCopy = await createBookCopy({
      borrower,
      borrowedAt
    });

    expect(bookCopy.borrowedAt).not.toBe(null);
    expect(bookCopy.borrowedAt).toEqual(borrowedAt);
  });
});
