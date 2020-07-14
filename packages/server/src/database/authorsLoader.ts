import DataLoader from "dataloader";
import { getConnection } from "typeorm";

import { Author } from "./entity/Author";
import { normalize } from "./normalize";

const batchLoadAuthors: DataLoader.BatchLoadFn<number, Author> = async (
  ids
) => {
  const authors = await getConnection().manager.findByIds(
    Author,
    ids as number[]
  );

  const byId = normalize<Author>(authors);

  return ids.map((id) => byId[id]);
};

export const buildAuthorsLoader = () =>
  new DataLoader<number, Author>(batchLoadAuthors);
