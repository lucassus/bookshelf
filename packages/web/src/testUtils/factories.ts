import { Author, Book, User } from "../types.generated";

type Factory<T> = (attributes?: Partial<T>) => T;

export const createAuthor: Factory<Author> = (attributes = {}) => ({
  id: "1",
  name: "J. K. Rowling",
  bio: "As a child, Rowling often wrote fantasy stories",
  photo: {
    url: "/book-authors/j-k-rowling.jpg",
    path:
      "http://examples.devmastery.pl/assets/images/book-authors/j-k-rowling.jpg"
  },
  books: [],
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
  copies: [],
  ...attributes
});

export const createUser: Factory<User> = (attributes = {}) => ({
  id: "1",
  name: "Bob",
  info: "Professional problem solver.",
  email: "bob@email.com",
  avatar: {
    image: {
      path: "/avatars/m25.png",
      url: "http://examples.devmastery.pl/assets/images/avatars/m25.png"
    },
    color: "yellow"
  },
  ownedBookCopies: [],
  borrowedBookCopies: [],
  ...attributes
});
