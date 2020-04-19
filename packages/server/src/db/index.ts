import { Author, Book, DbRecord, User } from "../types";
import { authors } from "./data/authors";
import { books } from "./data/books";
import { users } from "./data/users";

function findById<T extends DbRecord>(collection: T[], id: number): T {
  const record = collection.find(({ id: otherId }) => id === otherId);

  if (!record) {
    throw Error(`Unable to find a record id=${id}.`);
  }

  return { ...record };
}

export const findBookById = (id: number): Book => findById<Book>(books, id);

export const fetchBooks = (): Book[] => books.map(({ id }) => findBookById(id));

export const findAuthorById = (id: number): Author =>
  findById<Author>(authors, id);

export const fetchAuthors = (): Author[] =>
  authors.map(({ id }) => findAuthorById(id));

export const findUserById = (id: number): User => findById<User>(users, id);

export const fetchUsers = (): User[] => users.map(({ id }) => findUserById(id));
