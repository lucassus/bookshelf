import { Author, Book, User } from "../types.generated";

type Factory<T> = (attributes?: Partial<T>) => T;

export const createAuthor: Factory<Author> = (attributes = {}) => ({
  id: 1,
  name: "J. K. Rowling",
  photo: {
    url:
      "http://examples.devmastery.pl/assets/images/book-authors/j-k-rowling.jpg"
  },
  ...attributes
});

export const createBook: Factory<Book> = (attributes = {}) => ({
  id: 1,
  title: "Test book",
  favourite: false,
  cover: {
    url: "http://examples.devmastery.pl/assets/images/book-covers/witcher1.jpg"
  },
  ...attributes
});

export const createUser: Factory<User> = (attributes = {}) => ({
  id: 1,
  name: "Bob",
  email: "bob@email.com",
  avatar: {
    image: {
      url: "http://examples.devmastery.pl/assets/images/avatars/m25.png"
    },
    color: "yellow"
  },
  ...attributes
});
