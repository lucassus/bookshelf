import { AbstractRepository, EntityRepository } from "typeorm";

import { Book } from "./entity/Book";

@EntityRepository(Book)
export class BookRepository extends AbstractRepository<Book> {
  findRandom() {
    return this.repository
      .createQueryBuilder()
      .orderBy("RANDOM()")
      .limit(1)
      .getOne();
  }
}
