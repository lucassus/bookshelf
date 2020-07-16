import { getConnection } from "typeorm";

import { Avatar } from "../entity/Avatar";
import { createAuthor, createBook, createUser } from "../factories";

describe("BookCopyRepository", () => {
  test(".borrow", async () => {
    const connection = getConnection();

    const book = await createBook({
      title: "Baptism of fire",
      coverPath: "/images/book-covers/witcher3.jpg"
    });
    console.log({ book });

    const avatar = await connection.manager.save(
      connection.manager.create(Avatar, {
        imagePath: "/images/avatars/w13.png",
        color: "yellow"
      })
    );

    const user = await createUser({
      name: "Alice",
      email: "alice@email.com",
      avatarId: avatar.id
    });

    console.log({ user });
  });
});
