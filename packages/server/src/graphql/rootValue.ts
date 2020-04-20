import { db } from "../db";

export const rootValue = {
  message: "Hello World!",

  books: db.books.find(),
  authors: db.authors.find(),
  users: db.users.find(),
};
