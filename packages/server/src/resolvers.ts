import { findAuthorById, findBookById } from "./db";
import { Author, Book } from "./types";

export const resolvers = {
  Book: {
    author: (parent: Book) => findAuthorById(parent.authorId),
  },
  Author: {
    books: (parent: Author) => parent.bookIds.map((id) => findBookById(id)),
  },
};
