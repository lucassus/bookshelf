import { DeepPartial } from "typeorm/common/DeepPartial";

import { User } from "../../src/entity/User";

export const usersData: DeepPartial<User>[] = [
  {
    name: "Alice",
    email: "alice@example.com",
    avatar: {
      imagePath: "/images/avatars/w13.png",
      color: "yellow"
    }
  },
  {
    name: "Bob",
    email: "bob@example.com",
    avatar: {
      imagePath: "/images/avatars/m10.png",
      color: "green"
    }
  },
  {
    name: "Celine",
    email: "celine@example.com",
    avatar: {
      imagePath: "/images/avatars/w2.png",
      color: "red"
    }
  },
  {
    name: "Dan",
    email: "dan@example.com",
    avatar: {
      imagePath: "/images/avatars/m25.png",
      color: "blue"
    }
  }
];
