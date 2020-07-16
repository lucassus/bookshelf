import { createBook, createUser } from "./factories";

test(".createUser", async () => {
  let user = await createUser();
  expect(user.name).toBe("Alice");
  expect(user.email).toBe("alice@email.com");

  user = await createUser({ name: "Bob" });
  expect(user.name).toBe("Bob");
  expect(user.email).toBe("bob@email.com");

  user = await createUser({ name: "Bob", email: "john@email.com" });
  expect(user.name).toBe("Bob");
  expect(user.email).toBe("john@email.com");
});

describe(".createBook", () => {
  it("creates a book along with an author", async () => {
    const book = await createBook();

    expect(book.title).toBe("Baptism of fire");
    await expect(book.author).resolves.toMatchObject({
      name: "Andrzej Sapkowski"
    });
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
