import { db } from "./db";
import { Author, Book } from "./types";

export const resolvers = {
  Book: {
    author: (parent: Book) => db.authors.findOne({ id: parent.authorId }),
  },
  Author: {
    books: (parent: Author) => db.books.find({ authorId: parent.id }),
  },
};
