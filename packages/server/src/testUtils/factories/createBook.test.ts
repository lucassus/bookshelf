import { createBook } from "./createBook";

describe(".createBook", () => {
  it("creates a book along with an author", async () => {
    const book = await createBook();
    await expect(book.author).resolves.not.toBeUndefined();
  });

  test("creates a book along with given author attributes", async () => {
    const book = await createBook({
      title: "Harry Potter and the Deathly Hallows",
      authorAttributes: {
        name: "J. K. Rowling"
      }
    });

    expect(book.title).toBe("Harry Potter and the Deathly Hallows");
    await expect(book.author).resolves.toMatchObject({
      name: "J. K. Rowling"
    });
  });
});
