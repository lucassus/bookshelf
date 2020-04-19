import { fetchAuthors, fetchBooks, fetchUsers } from "./db";

export const rootValue = {
  message: "Hello World!",

  books: fetchBooks(),
  authors: fetchAuthors(),
  users: fetchUsers(),
};
