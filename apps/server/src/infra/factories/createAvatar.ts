import faker from "faker";

import { createEntity } from "./createEntity";
import { Avatar } from "~/infra/database/entity";

const AVATAR_IMAGES = [
  "/users/w13.png",
  "/users/m10.png",
  "/users/w2.png",
  "/users/m25.png"
];

const AVATAR_COLORS = [
  "red",
  "green",
  "blue",
  "yellow",
  "magenta",
  "pink",
  "black"
];

export type CreateAvatarAttributes = Partial<Avatar>;

export function createAvatar(
  attributes: CreateAvatarAttributes = {}
): Promise<Avatar> {
  return createEntity(Avatar, {
    imagePath: faker.random.arrayElement(AVATAR_IMAGES),
    color: faker.random.arrayElement(AVATAR_COLORS),
    ...attributes
  });
}
