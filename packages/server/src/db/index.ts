import { Author, Book, User } from "../types";
import { authors } from "./data/authors";
import { books } from "./data/books";
import { users } from "./data/users";

const findById = <T extends { id: number }>(collection: T[], id: number): T => {
  const record = collection.find(({ id: otherId }) => id === otherId);

  if (!record) {
    throw Error(`Unable to find a record id=${id}.`);
  }

  return { ...record };
};

export const findBookById = (id: number): Book => findById<Book>(books, id);

export const fetchBooks = (): Book[] => books.map(({ id }) => findBookById(id));

const fetchBooksByAuthorId = (id: number): Book[] =>
  fetchBooks().filter((book) => book.authorId === id);

export const findAuthorById = (id: number): Author => {
  const author = findById<Author>(authors, id);
  const authorsBooks = fetchBooksByAuthorId(author.id);

  return { ...author, bookIds: authorsBooks.map((book) => book.id) };
};

export const fetchAuthors = (): Author[] =>
  authors.map(({ id }) => findAuthorById(id));

export const findUserById = (id: number): User => findById<User>(users, id);

export const fetchUsers = (): User[] => users.map(({ id }) => findUserById(id));
