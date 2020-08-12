import {
  createAvatar,
  createBook,
  createBookCopy,
  createUser
} from "./factories";

test("createUser factory", async () => {
  await createUser();
  await createUser({ name: "Alice" });

  const avatar = await createAvatar({ color: "yellow" });
  const user = await createUser({ name: "Bob", avatar });

  expect(user.name).toBe("Bob");
  expect(user.email).toBe("Alycia.Greenfelder23@gmail.com");
  expect(user.avatar.color).toBe("yellow");
});

test("createBook factory", async () => {
  const book = await createBook({
    title: "Dune",
    authorAttributes: { name: "Frank Herbert" }
  });

  expect(book.title).toBe("Dune");
  expect(book.description).not.toBe(undefined);

  const author = await book.author;
  expect(author.name).toBe("Frank Herbert");
});

test("createBookCopy factory", async () => {
  await createBookCopy();

  const borrower = await createUser();
  const bookCopy = await createBookCopy({
    borrower,
    bookAttributes: {
      title: "Ubik",
      description: "Ubik is a 1969 science fiction novel",
      authorAttributes: { name: "Philip K. Dick" }
    }
  });

  const owner = await bookCopy.owner;
  expect(owner.name).toBe("Cordell Lockman");
  expect(owner.email).toBe("Christine_Bartell77@yahoo.com");

  const book = await bookCopy.book;
  expect(book.title).toBe("Ubik");
  expect(book.description).toBe("Ubik is a 1969 science fiction novel");

  const author = await book.author;
  expect(author.name).toBe("Philip K. Dick");
});
