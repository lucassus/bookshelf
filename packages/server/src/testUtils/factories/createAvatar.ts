import faker from "faker";

import { Avatar } from "../../database/entity/Avatar";
import { createEntity } from "./createEntity";

const AVATAR_IMAGES = [
  "/images/avatars/w13.png",
  "/images/avatars/m10.png",
  "/images/avatars/w2.png",
  "/images/avatars/m25.png"
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
