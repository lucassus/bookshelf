import { Book, User } from "../database/entity";

// TODO: Naive serialization, find a better solution
//  See https://www.npmjs.com/package/class-transformer
//  or https://docs.nestjs.com/techniques/serialization

export const serializeUser = async (user: User) => {
  const borrowedBooks = await user.borrowedBookCopies;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    borrowedBooks: await Promise.all(
      borrowedBooks.map(async (borrowedBook) => {
        const book = await borrowedBook.book;

        return {
          id: book.id,
          title: book.title
        };
      })
    )
  };
};

export const serializeBooks = (books: Book[]) =>
  Promise.all(
    books.map(async (book) => {
      const author = await book.author;

      return {
        id: book.id,
        title: book.title,
        description: book.description,
        author: {
          id: author.id,
          name: author.name
        }
      };
    })
  );

export const serializeUsers = (users: User[]) =>
  users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email
  }));
