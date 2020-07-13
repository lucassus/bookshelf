import DataLoader from "dataloader";
import { getConnection } from "typeorm";

import { Author } from "./entity/Author";

const batchLoadAuthors: DataLoader.BatchLoadFn<number, Author> = async (
  ids
) => {
  const authors = await getConnection().manager.findByIds(
    Author,
    ids as number[]
  );

  // TODO: Or use a map?

  return ids.map(
    (id) =>
      authors.find((author) => author.id === id) ||
      new Error(`Row not found: ${id}`)
  );
};

export const buildAuthorsLoader = () =>
  new DataLoader<number, Author>(batchLoadAuthors);
