import { AbstractRepository, EntityRepository } from "typeorm";

import { Book } from "../entity";

@EntityRepository(Book)
export class BookRepository extends AbstractRepository<Book> {
  async updateFavourite(id: string | number, favourite: boolean) {
    const book = await this.manager.findOneOrFail(Book, id);

    book.favourite = favourite;
    return this.manager.save(book);
  }
}
