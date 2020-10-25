import DataLoader from "dataloader";
import { getRepository } from "typeorm";

import { Book } from "../../database/entity";
import { normalize } from "../../database/normalize";

const batchLoadBooks: DataLoader.BatchLoadFn<string | number, Book> = async (
  ids
) => {
  const authors = await getRepository(Book).findByIds(ids as any[]);
  const byId = normalize<Book>(authors);

  return ids.map((id) => byId[id]);
};

export const buildBooksLoader = () =>
  new DataLoader<string | number, Book>(batchLoadBooks);
