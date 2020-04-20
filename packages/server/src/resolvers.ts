import { db } from "./db";
import { Author, Book, Image } from "./db/types";

const ASSETS_BASE_URL = "http://examples.devmastery.pl/assets";

export const resolvers = {
  Book: {
    author: (parent: Book) => db.authors.findOne({ id: parent.authorId }),
  },
  Author: {
    books: (parent: Author) => db.books.find({ authorId: parent.id }),
  },
  Image: {
    url: (parent: Image) => ASSETS_BASE_URL + parent.path,
  },
};
