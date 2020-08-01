import { AbstractRepository, EntityRepository } from "typeorm";

import { Book } from "../entity";

@EntityRepository(Book)
export class BookRepository extends AbstractRepository<Book> {
  async findRandom() {
    const book = await this.repository
      .createQueryBuilder()
      .orderBy("RANDOM()")
      .limit(1)
      .getOne();

    return book || null;
  }

  async updateFavourite(id: string | number, favourite: boolean) {
    const book = await this.manager.findOneOrFail(Book, id);

    book.favourite = favourite;
    return this.manager.save(book);
  }
}
