import DataLoader from "dataloader";
import { getConnection } from "typeorm";

import { Author } from "./entity/Author";

export const buildAuthorsLoader = () =>
  new DataLoader<number, Author>(async (keys) => {
    const authors = await getConnection().manager.findByIds(
      Author,
      keys as number[]
    );

    const byId: Record<number, Author> = authors.reduce(
      (result, author) => ({
        ...result,
        [author.id]: author
      }),
      {}
    );

    return keys.map((authorId) => byId[authorId]);
  });
