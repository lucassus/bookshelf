import DataLoader from "dataloader";
import { getRepository } from "typeorm";

import { normalize } from "../../common/normalize";
import { Author } from "../../infra/database/entity";

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
