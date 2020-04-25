import "reflect-metadata";
import { createConnection } from "typeorm";

import config from "../ormconfig";
import { Author } from "../src/entity/Author";
import { Avatar } from "../src/entity/Avatar";
import { Book } from "../src/entity/Book";
import { User } from "../src/entity/User";

// TODO: Improve this script

createConnection(config)
  .then(async () => {
    const avatar = Avatar.create({
      imagePath: "/images/avatars/w13.png",
      color: "yellow"
    });
    await avatar.save();

    const user = User.create({
      name: "Alice",
      email: "alice@example.com",
      avatar
    });
    await user.save();

    const users = await User.find();
    console.log({ users });

    const author = Author.create({
      name: "Andrzej Sapkowski",
      photoPath: "/images/book-authors/andrzej-sapkowski.jpg"
    });
    await author.save();

    const book = Book.create({
      title: "Blood of Elves",
      coverPath: "/images/book-covers/witcher1.jpg",
      author
    });
    await book.save();

    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
