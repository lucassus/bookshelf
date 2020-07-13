import DataLoader from "dataloader";
import { getConnection } from "typeorm";

import { Author } from "./entity/Author";

// TODO: The Array of values must be the same length as the Array of keys.
// TODO: Each index in the Array of values must correspond to the same index in the Array of keys.
const batchLoadAuthors: DataLoader.BatchLoadFn<number, Author> = async (
  ids
) => {
  const authors = await getConnection().manager.findByIds(
    Author,
    ids as number[]
  );

  const byId: Record<number, Author> = authors.reduce(
    (result, author) => ({
      ...result,
      [author.id]: author
    }),
    {}
  );

  return ids.map((authorId) => byId[authorId]);
};

export const buildAuthorsLoader = () =>
  new DataLoader<number, Author>(batchLoadAuthors);
