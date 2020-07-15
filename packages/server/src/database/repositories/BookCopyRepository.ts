import { AbstractRepository, EntityRepository } from "typeorm";

import { BookCopy } from "../entity/BookCopy";

@EntityRepository(BookCopy)
export class BookCopyRepository extends AbstractRepository<BookCopy> {
  async borrow(id: string | number, userId: number) {
    const bookCopy = await this.repository.findOneOrFail(id);

    if (bookCopy.borrowerId) {
      throw new Error("Cannot borrow this book copy. It is already borrowed.");
    }

    bookCopy.borrowerId = userId;
    return this.repository.save(bookCopy);
  }
}
