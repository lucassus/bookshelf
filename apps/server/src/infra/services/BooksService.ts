import { Book, User } from "@bookshelf/server/infra/database/entity";
import { Service } from "typedi";
import { EntityManager, Repository } from "typeorm";
import { InjectManager, InjectRepository } from "typeorm-typedi-extensions";

@Service()
export class BooksService {
  @InjectRepository(Book)
  private repository: Repository<Book>;

  @InjectManager()
  private manager: EntityManager;

  count(): Promise<number> {
    return this.repository.count();
  }

  paginate({ take, skip }: { take?: number; skip?: number }): Promise<Book[]> {
    return this.repository.find({ order: { title: "ASC" }, take, skip });
  }

  findByIdOrFail(id: string | number): Promise<Book> {
    return this.repository.findOneOrFail(id);
  }

  findRandom(): Promise<Book | undefined> {
    return this.repository
      .createQueryBuilder()
      .orderBy("RANDOM()")
      .limit(1)
      .getOne();
  }

  async addToFavourite(book: Book, user: User): Promise<User> {
    const favouriteBooks = await user.favouriteBooks;

    const updatedUser = user;
    updatedUser.favouriteBooks = Promise.resolve([...favouriteBooks, book]);

    return this.manager.save(updatedUser);
  }

  async removeFromFavourites(book: Book, user: User): Promise<User> {
    const favouriteBooks = await user.favouriteBooks;

    const updatedUser = user;
    updatedUser.favouriteBooks = Promise.resolve(
      favouriteBooks.filter((favouriteBook) => favouriteBook.id !== book.id)
    );

    return this.manager.save(updatedUser);
  }
}
