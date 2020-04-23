import { User } from "../types";

export const users: User[] = [
  {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    avatar: {
      imagePath: "/images/avatars/w13.png",
      color: "yellow"
    }
  },
  {
    id: 2,
    name: "Bob",
    email: "bob@example.com",
    avatar: {
      imagePath: "/images/avatars/m10.png",
      color: "green"
    }
  },
  {
    id: 3,
    name: "Celine",
    email: "celine@example.com",
    avatar: {
      imagePath: "/images/avatars/w2.png",
      color: "red"
    }
  },
  {
    id: 4,
    name: "Dan",
    email: "dan@example.com",
    avatar: {
      imagePath: "/images/avatars/m25.png",
      color: "blue"
    }
  }
];
