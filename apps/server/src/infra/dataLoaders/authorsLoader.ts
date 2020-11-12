import { Author } from "@bookshelf/server/infra/database/entity";
import { normalize } from "@bookshelf/server/infra/support/normalize";
import DataLoader from "dataloader";
import { getRepository } from "typeorm";

const batchLoadAuthors: DataLoader.BatchLoadFn<
  string | number,
  Author
> = async (ids) => {
  const authors = await getRepository(Author).findByIds(ids as any[]);
  const byId = normalize<Author>(authors);

  return ids.map((id) => byId[id]);
};

export const buildAuthorsLoader = () =>
  new DataLoader<string | number, Author>(batchLoadAuthors);
