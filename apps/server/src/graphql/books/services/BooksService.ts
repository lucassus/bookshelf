import { Service } from "typedi";
import { EntityManager, Repository } from "typeorm";
import { InjectManager, InjectRepository } from "typeorm-typedi-extensions";

import { Book, User } from "../../../database/entity";

@Service()
export class BooksService {
  @InjectRepository(Book)
  private repository: Repository<Book>;

  @InjectManager()
  private manager: EntityManager;

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

  async addToFavourite(book: Book, user: User) {
    const favouriteBooks = await user.favouriteBooks;
    user.favouriteBooks = Promise.resolve([...favouriteBooks, book]);
    await this.manager.save(user);
  }

  async removeFromFavourites(book: Book, user: User) {
    const favouriteBooks = await user.favouriteBooks;
    user.favouriteBooks = Promise.resolve(
      favouriteBooks.filter((favouriteBook) => favouriteBook.id !== book.id)
    );
    await this.manager.save(user);
  }
}
