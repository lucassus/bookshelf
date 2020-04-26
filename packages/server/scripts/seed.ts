import "reflect-metadata";
import { createConnection } from "typeorm";

import config from "../ormconfig";
import { Author } from "../src/entity/Author";
import { Book } from "../src/entity/Book";
import { User } from "../src/entity/User";

const seed = async () => {
  const connection = await createConnection(config);
  await connection.synchronize(true);

  const { manager } = connection;

  const authors = manager.create(Author, [
    {
      name: "J. K. Rowling",
      photoPath: "/images/book-authors/j-k-rowling.jpg"
    },
    {
      name: "James S. A. Corey",
      photoPath: "/images/book-authors/james-s-a-corey.jpg"
    },
    {
      name: "Andrzej Sapkowski",
      photoPath: "/images/book-authors/andrzej-sapkowski.jpg"
    }
  ]);
  await manager.save(authors);

  const books = manager.create(Book, [
    {
      authorId: authors[0].id,
      title: "Harry Potter and the Sorcerer's Stone",
      coverPath: "/images/book-covers/harry1.jpg"
    },
    {
      authorId: authors[0].id,
      title: "Harry Potter and the Chamber of Secrets",
      coverPath: "/images/book-covers/harry2.jpg"
    },
    {
      authorId: authors[0].id,
      title: "Harry Potter and the Prisoner of Azkaban",
      coverPath: "/images/book-covers/harry3.jpg"
    },
    {
      authorId: authors[0].id,
      title: "Harry Potter and the Goblet of Fire",
      coverPath: "/images/book-covers/harry4.jpg"
    },
    {
      authorId: authors[0].id,
      title: "Harry Potter and the Order of the Phoenix",
      coverPath: "/images/book-covers/harry5.jpg"
    },
    {
      authorId: authors[0].id,
      title: "Harry Potter and the Half-Blood Prince",
      coverPath: "/images/book-covers/harry6.jpg"
    },
    {
      authorId: authors[0].id,
      title: "Harry Potter and the Deathly Hallows",
      coverPath: "/images/book-covers/harry7.jpg"
    },
    {
      authorId: authors[1].id,
      title: "Leviathan Wakes",
      coverPath: "/images/book-covers/expanse1.jpg"
    },
    {
      authorId: authors[1].id,
      title: "Caliban's War",
      coverPath: "/images/book-covers/expanse2.jpg"
    },
    {
      authorId: authors[1].id,
      title: "Abaddon's Gate",
      coverPath: "/images/book-covers/expanse3.jpg"
    },
    {
      authorId: authors[1].id,
      title: "Cibola Burn",
      coverPath: "/images/book-covers/expanse4.jpg"
    },
    {
      authorId: authors[1].id,
      title: "Nemesis Games",
      coverPath: "/images/book-covers/expanse5.jpg"
    },
    {
      authorId: authors[1].id,
      title: "Babylon's Ashes",
      coverPath: "/images/book-covers/expanse6.jpg"
    },
    {
      authorId: authors[1].id,
      title: "Persepolis Rising",
      coverPath: "/images/book-covers/expanse7.jpg"
    },
    {
      authorId: authors[1].id,
      title: "Tiamat's Wrath",
      coverPath: "/images/book-covers/expanse8.jpg"
    },
    {
      authorId: authors[2].id,
      title: "Blood of Elves",
      coverPath: "/images/book-covers/witcher1.jpg"
    },
    {
      authorId: authors[2].id,
      title: "Time of contempt",
      coverPath: "/images/book-covers/witcher2.jpg"
    },
    {
      authorId: authors[2].id,
      title: "Baptism of fire",
      coverPath: "/images/book-covers/witcher3.jpg"
    },
    {
      authorId: authors[2].id,
      title: "The tower of the swallow",
      coverPath: "/images/book-covers/witcher4.jpg"
    },
    {
      authorId: authors[2].id,
      title: "The lady of the lake",
      coverPath: "/images/book-covers/witcher5.jpg"
    }
  ]);
  await manager.save(books);

  const users = manager.create(User, [
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
  ]);
  await manager.save(users);
};

seed()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
