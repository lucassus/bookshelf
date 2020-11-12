import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { BookCopy } from "../../../../infra/database/entity";

@Service()
export class BookCopiesService {
  @InjectRepository(BookCopy)
  private repository: Repository<BookCopy>;

  async borrow(
    id: string | number,
    borrowerId: number,
    now = new Date()
  ): Promise<BookCopy> {
    const bookCopy = await this.repository.findOneOrFail(id);

    if (bookCopy.ownerId === borrowerId) {
      throw new Error("Cannot borrow own book.");
    }

    if (bookCopy.borrowerId) {
      throw new Error("Cannot borrow this book copy. It is already borrowed.");
    }

    bookCopy.borrowerId = borrowerId;
    bookCopy.borrowedAt = now;

    return this.repository.save(bookCopy);
  }

  async return(id: string | number, borrowerId: number): Promise<BookCopy> {
    const bookCopy = await this.repository.findOneOrFail({
      where: {
        id,
        borrowerId
      }
    });

    bookCopy.borrowerId = null;
    bookCopy.borrowedAt = null;

    return this.repository.save(bookCopy);
  }
}
