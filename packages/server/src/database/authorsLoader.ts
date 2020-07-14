import DataLoader from "dataloader";
import { getConnection } from "typeorm";

import { Author } from "./entity/Author";

const normalize = <U extends { id: number }>(rows: U[]) =>
  rows.reduce<Record<number, U>>(
    (result, row) => ({
      ...result,
      [row.id]: row
    }),
    {}
  );

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
