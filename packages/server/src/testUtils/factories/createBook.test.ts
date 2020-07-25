import { createAuthor } from "./createAuthor";
import { createBook } from "./createBook";

describe(".createBook", () => {
  it("creates a book along with an author", async () => {
    const book = await createBook({ title: "Dune" });

    expect(book.title).toBe("Dune");
    await expect(book.author).resolves.not.toBeUndefined();
  });

  it("creates a book with the given author", async () => {
    const author = await createAuthor({ name: "Andrzej Sapkowski" });
    const book = await createBook({ author });

    await expect(book.author).resolves.toMatchObject({
      name: "Andrzej Sapkowski"
    });
  });

  it("creates a book with the given authorId", async () => {
    const author = await createAuthor({ name: "Andrzej Sapkowski" });
    const book = await createBook({ authorId: author.id });

    await expect(book.author).resolves.toMatchObject({
      name: "Andrzej Sapkowski"
    });
  });

  it("creates a book along with given author attributes", async () => {
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
