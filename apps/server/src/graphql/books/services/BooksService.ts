import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { Book } from "../../../database/entity";

@Service()
export class BooksService {
  @InjectRepository(Book)
  private repository: Repository<Book>;

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
