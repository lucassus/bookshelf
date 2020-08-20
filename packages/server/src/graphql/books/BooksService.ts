import { Repository, Connection } from "typeorm";

import { Book } from "../../database/entity";

export class BooksService {
  private repository: Repository<Book>;

  constructor(connection: Connection) {
    this.repository = connection.getRepository(Book);
  }

  count() {
    return this.repository.count();
  }

  paginate(take: number, skip: number) {
    return this.repository.find({ order: { title: "ASC" }, take, skip });
  }

  findByIdOrFail(id: string | number) {
    return this.repository.findOneOrFail(id);
  }

  async findRandom(): Promise<Book | null> {
    const book = await this.repository
      .createQueryBuilder()
      .orderBy("RANDOM()")
      .limit(1)
      .getOne();

    return book || null;
  }
}
