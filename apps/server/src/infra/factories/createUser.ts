import { User } from "@bookshelf/server/infra/database/entity";
import { hashPassword } from "@bookshelf/server/infra/support/passwords";
import faker from "faker";

import { createAvatar, CreateAvatarAttributes } from "./createAvatar";
import { createEntity } from "./createEntity";

export type CreateUserAttributes = Partial<User> & {
  password?: string;
  avatarAttributes?: CreateAvatarAttributes;
};

export async function createUser(
  attributes: CreateUserAttributes = {}
): Promise<User> {
  const { avatarAttributes, password, ...userAttributes } = attributes;

  const avatar = await createAvatar(avatarAttributes);

  const user = await createEntity(User, {
    name: faker.name.findName(),
    email: faker.internet.email(),
    info: faker.lorem.sentence(),
    passwordHash: hashPassword(password || "password"),
    avatarId: avatar.id,
    isAdmin: false,
    ...userAttributes
  });

  user.avatar = avatar;
  return user;
}
