import { AbstractRepository, EntityRepository } from "typeorm";

import { BookCopy } from "../entity/BookCopy";

@EntityRepository(BookCopy)
export class BookCopyRepository extends AbstractRepository<BookCopy> {
  async borrow(id: string | number, borrowerId: number) {
    const bookCopy = await this.repository.findOneOrFail(id);

    if (bookCopy.ownerId === borrowerId) {
      throw new Error("Cannot borrow own book.");
    }

    if (bookCopy.borrowerId) {
      throw new Error("Cannot borrow this book copy. It is already borrowed.");
    }

    bookCopy.borrowerId = borrowerId;
    return this.repository.save(bookCopy);
  }

  async return(id: string | number, borrowerId: number) {
    const bookCopy = await this.repository.findOneOrFail({
      where: {
        id,
        borrowerId
      }
    });

    bookCopy.borrowerId = null;
    return this.repository.save(bookCopy);
  }
}
