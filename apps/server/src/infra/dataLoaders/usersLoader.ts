import DataLoader from "dataloader";
import { getRepository } from "typeorm";

import { User } from "~/infra/database/entity";
import { normalize } from "~/infra/support/normalize";

const batchLoadUsers: DataLoader.BatchLoadFn<string | number, User> = async (
  ids
) => {
  const users = await getRepository(User).findByIds(ids as any[]);
  const byId = normalize<User>(users);

  return ids.map((id) => byId[id]);
};

export const buildUsersLoader = () =>
  new DataLoader<string | number, User>(batchLoadUsers);
