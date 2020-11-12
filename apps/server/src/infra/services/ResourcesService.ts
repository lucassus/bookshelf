import { Author, Book, User } from "@bookshelf/server/infra/database/entity";
import { toInternalIdAndType } from "@bookshelf/server/infra/support/secureId";
import { Service } from "typedi";
import { Connection, ObjectType } from "typeorm";
import { InjectConnection } from "typeorm-typedi-extensions";

@Service()
export class ResourcesService {
  @InjectConnection()
  private connection: Connection;

  findAll(): Promise<(User | Author | Book)[]> {
    return Promise.all([
      this.connection.getRepository(User).find(),
      this.connection.getRepository(Author).find(),
      this.connection.getRepository(Book).find()
    ]).then(([users, authors, books]) => [...users, ...authors, ...books]);
  }

  findResourceOrFail(externalId: string): Promise<Author | Book | User> {
    const [id, type] = toInternalIdAndType(externalId);

    const map: Record<string, ObjectType<Author | Book | User>> = {
      Author,
      Book,
      User
    };

    if (!map[type]) {
      throw Error(`Unknown type: ${type}`);
    }

    return this.connection.manager.findOneOrFail(map[type], id);
  }
}
