import { Book } from "@bookshelf/server/infra/database/entity";
import { normalize } from "@bookshelf/server/infra/support/normalize";
import DataLoader from "dataloader";
import { getRepository } from "typeorm";

const batchLoadBooks: DataLoader.BatchLoadFn<string | number, Book> = async (
  ids
) => {
  const books = await getRepository(Book).findByIds(ids as any[]);
  const byId = normalize<Book>(books);

  return ids.map((id) => byId[id]);
};

export const buildBooksLoader = () =>
  new DataLoader<string | number, Book>(batchLoadBooks);
