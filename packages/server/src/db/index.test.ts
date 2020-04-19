import {
  fetchAuthors,
  fetchBooks,
  fetchUsers,
  findAuthorById,
  findBookById,
  findUserById,
} from "./index";

describe(".findBookById", () => {
  it("returns a book", () => {
    const book = findBookById(1);
    expect(book).toEqual({
      id: 1,
      authorId: 1,
      title: "Harry Potter and the Sorcerer's Stone",
      cover: {
        url:
          "http://examples.devmastery.pl/assets/images/book-covers/harry1.jpg",
      },
    });
  });

  it("returns undefined if a book cannot be found", () => {
    expect(() => findBookById(100)).toThrow("Unable to find a record id=100");
  });

  it("returns a copy of a book", () => {
    const book = findBookById(2);
    book.title = "The Lord of the Rings";
    expect(findBookById(2).title).toEqual(
      "Harry Potter and the Chamber of Secrets"
    );
  });
});

describe(".fetchBooks", () => {
  it("returns all books", () => {
    expect(fetchBooks()).toHaveLength(20);
  });
});

describe(".findAuthorById", () => {
  it("returns an author", () => {
    const author = findAuthorById(2);
    expect(author).toEqual({
      id: 2,
      bookIds: [8, 9, 10, 11, 12, 13, 14],
      name: "James S. A. Corey",
      photo: {
        url:
          "http://examples.devmastery.pl/assets/images/book-authors/james-s-a-corey.jpg",
      },
    });
  });

  it("returns an author", () => {
    const author = findAuthorById(3);
    expect(author).toEqual({
      id: 3,
      bookIds: [15, 16, 17, 18, 19, 20],
      name: "Andrzej Sapkowski",
      photo: {
        url:
            "http://examples.devmastery.pl/assets/images/book-authors/andrzej-sapkowski.jpg",
      },
    });
  });
});

describe(".fetchAuthors", () => {
  it("returns all authors", () => {
    expect(fetchAuthors()).toHaveLength(3);
  });
});

describe(".findUserById", () => {
  it("returns an user", () => {
    expect(findUserById(1)).toEqual({
      id: 1,
      name: "Alice",
      email: "alice@example.com",
      avatar: {
        image: {
          url: "http://examples.devmastery.pl/assets/images/avatars/w13.png",
        },
        color: "yellow",
      },
    });
  });
});

describe(".fetchUsers", () => {
  it("returns all users", () => {
    expect(fetchUsers()).toHaveLength(4);
  });
});
