import { Connection, ObjectType } from "typeorm";

import { secureId } from "../common/secureId";
import { Author } from "./entity/Author";
import { Book } from "./entity/Book";
import { BookCopy } from "./entity/BookCopy";
import { User } from "./entity/User";

export const findAnythingOrFail = (
  externalId: string,
  connection: Connection
): Promise<Author | Book | User | BookCopy> => {
  const [id, type] = secureId.toInternalAndType(externalId);

  const map: Record<string, ObjectType<Author | Book | User | BookCopy>> = {
    Author,
    Book,
    User,
    BookCopy
  };

  if (!map[type]) {
    throw Error(`Unknown type: ${type}`);
  }

  return connection.manager.findOneOrFail(map[type], id);
};
