import { Author, Book } from "../types.generated";

type Factory<T> = (attributes?: Partial<T>) => T;

export const createAuthor: Factory<Author> = (attributes = {}) => ({
  id: "1",
  name: "J. K. Rowling",
  bio: "As a child, Rowling often wrote fantasy stories",
  photo: {
    path: "/book-authors/j-k-rowling.jpg",
    url:
      "http://examples.devmastery.pl/assets/images/book-authors/j-k-rowling.jpg"
  },
  books: [],
  createdAt: "2020-07-19T14:00:00.00Z",
  updatedAt: "2020-07-19T14:00:00.00Z",
  ...attributes
});

export const createBook: Factory<Book> = (attributes = {}) => ({
  id: "1",
  title: "Test book",
  description: "Lorem impsum",
  favourite: false,
  cover: {
    path: "/book-covers/witcher1.jpg",
    url: "http://examples.devmastery.pl/assets/images/book-covers/witcher1.jpg"
  },
  author: createAuthor(),
  copies: [],
  createdAt: "2020-07-19T14:00:00.00Z",
  updatedAt: "2020-07-19T14:00:00.00Z",
  ...attributes
});
