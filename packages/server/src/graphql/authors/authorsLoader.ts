import DataLoader from "dataloader";
import { getManager } from "typeorm";

import { Author } from "../../database/entity/Author";
import { normalize } from "../../database/normalize";

const batchLoadAuthors: DataLoader.BatchLoadFn<
  string | number,
  Author
> = async (ids) => {
  const authors = await getManager().findByIds(Author, ids as number[]);

  const byId = normalize<Author>(authors);

  return ids.map((id) => byId[id]);
};

export const buildAuthorsLoader = () =>
  new DataLoader<string | number, Author>(batchLoadAuthors);
