import { Collection } from "./Collection";
import { authors } from "./data/authors";
import { books } from "./data/books";
import { users } from "./data/users";
import { Author, Book, User } from "./types";

// A dummy database that mimics mongodb
export const db = {
  books: new Collection<Book>(books),
  authors: new Collection<Author>(authors),
  users: new Collection<User>(users)
};
