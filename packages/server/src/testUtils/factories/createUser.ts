import faker from "faker";

import { hashPassword } from "../../common/authentication";
import { User } from "../../database/entity/User";
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

  return createEntity(User, {
    name: faker.name.findName(),
    email: faker.internet.email(),
    info: faker.lorem.sentence(),
    passwordHash: hashPassword(password || "password"),
    avatarId: avatar.id,
    isAdmin: false,
    ...userAttributes
  });
}
