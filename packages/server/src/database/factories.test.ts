import { createBook } from "./factories";

describe(".createBook", () => {
  it("creates a book along with an author", async () => {
    const book = await createBook();

    expect(book.title).toBe("Baptism of fire");
    await expect(book.author).resolves.toMatchObject({
      name: "Andrzej Sapkowski"
    });
  });
});
