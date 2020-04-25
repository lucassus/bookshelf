import "reflect-metadata";
import { createConnection } from "typeorm";

import ormconfig from "../ormconfig";
import { Author } from "../src/entity/Author";
import { Avatar } from "../src/entity/Avatar";
import { Book } from "../src/entity/Book";
import { User } from "../src/entity/User";

createConnection(ormconfig)
  .then(async (connection) => {
    const avatar = new Avatar();
    avatar.imagePath = "/images/avatars/w13.png";
    avatar.color = "yellow";
    await connection.manager.save(avatar);

    const user = new User();
    user.name = "Alice";
    user.email = "alice@example.com";
    user.avatar = avatar;
    await connection.manager.save(user);

    const users = await connection.manager.find(User);
    console.log({ users });

    const author = new Author();
    author.name = "Andrzej Sapkowski";
    author.photoPath = "/images/book-authors/andrzej-sapkowski.jpg";
    await connection.manager.save(author);

    const book = new Book();
    book.title = "Blood of Elves";
    book.coverPath = "/images/book-covers/witcher1.jpg";
    book.author = author;
    await connection.manager.save(book);

    process.exit(0);
  })
  .catch((error) => console.log(error));
