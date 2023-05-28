import { faker } from "@faker-js/faker";

import { createAvatar, CreateAvatarAttributes } from "./createAvatar";
import { createEntity } from "./createEntity";
import { User } from "~/infra/database/entity";
import { hashPassword } from "~/infra/support/passwords";

export type CreateUserAttributes = Partial<User> & {
  password?: string;
  avatarAttributes?: CreateAvatarAttributes;
};

export async function createUser(
  attributes: CreateUserAttributes = {}
): Promise<User> {
  const { avatarAttributes, password, ...userAttributes } = attributes;

  const avatar =
    userAttributes.avatar || (await createAvatar(avatarAttributes));

  const user = await createEntity(User, {
    name: faker.person.fullName(),
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
