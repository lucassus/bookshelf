import faker from "faker";

import { hashPassword } from "../../common/authentication";
import { User } from "../../database/entity/User";
import { createAvatar, CreateAvatarAttributes } from "./createAvatar";
import { createEntity } from "./createEntity";

export type CreateUserAttributes = Partial<User> & {
  password?: string;
  avatarAttributes?: CreateAvatarAttributes;
};

export async function createUser(attributes: CreateUserAttributes = {}) {
  const { avatarAttributes, password, ...userAttributes } = attributes;

  if (userAttributes.name === undefined) {
    userAttributes.name = faker.name.findName();
  }

  if (userAttributes.email === undefined) {
    userAttributes.email = faker.internet.email();
  }

  if (userAttributes.info === undefined) {
    userAttributes.info = faker.lorem.sentence();
  }

  if (userAttributes.avatarId === undefined) {
    const avatar = await createAvatar();
    userAttributes.avatarId = avatar.id;
  }

  if (avatarAttributes) {
    const avatar = await createAvatar(avatarAttributes);
    userAttributes.avatarId = avatar.id;
  }

  return createEntity(User, {
    passwordHash: hashPassword(password || "password"),
    isAdmin: false,
    ...userAttributes
  });
}
