import "reflect-metadata";
import { createConnection } from "typeorm";
import { DeepPartial } from "typeorm/common/DeepPartial";

import config from "../ormconfig";
import { Author } from "../src/entity/Author";
import { User } from "../src/entity/User";

const usersData: DeepPartial<User>[] = [
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

const authorsAndBooksData: DeepPartial<Author>[] = [
  {
    name: "J. K. Rowling",
    photoPath: "/images/book-authors/j-k-rowling.jpg",
    books: [
      {
        title: "Harry Potter and the Sorcerer's Stone",
        coverPath: "/images/book-covers/harry1.jpg"
      },
      {
        title: "Harry Potter and the Chamber of Secrets",
        coverPath: "/images/book-covers/harry2.jpg"
      },
      {
        title: "Harry Potter and the Prisoner of Azkaban",
        coverPath: "/images/book-covers/harry3.jpg"
      },
      {
        title: "Harry Potter and the Goblet of Fire",
        coverPath: "/images/book-covers/harry4.jpg"
      },
      {
        title: "Harry Potter and the Order of the Phoenix",
        coverPath: "/images/book-covers/harry5.jpg"
      },
      {
        title: "Harry Potter and the Half-Blood Prince",
        coverPath: "/images/book-covers/harry6.jpg"
      },
      {
        title: "Harry Potter and the Deathly Hallows",
        coverPath: "/images/book-covers/harry7.jpg"
      }
    ]
  },
  {
    name: "James S. A. Corey",
    photoPath: "/images/book-authors/james-s-a-corey.jpg",
    books: [
      {
        title: "Leviathan Wakes",
        coverPath: "/images/book-covers/expanse1.jpg"
      },
      {
        title: "Caliban's War",
        coverPath: "/images/book-covers/expanse2.jpg"
      },
      {
        title: "Abaddon's Gate",
        coverPath: "/images/book-covers/expanse3.jpg"
      },
      {
        title: "Cibola Burn",
        coverPath: "/images/book-covers/expanse4.jpg"
      },
      {
        title: "Nemesis Games",
        coverPath: "/images/book-covers/expanse5.jpg"
      },
      {
        title: "Babylon's Ashes",
        coverPath: "/images/book-covers/expanse6.jpg"
      },
      {
        title: "Persepolis Rising",
        coverPath: "/images/book-covers/expanse7.jpg"
      },
      {
        title: "Tiamat's Wrath",
        coverPath: "/images/book-covers/expanse8.jpg"
      }
    ]
  },
  {
    name: "Andrzej Sapkowski",
    photoPath: "/images/book-authors/andrzej-sapkowski.jpg",
    books: [
      {
        title: "Blood of Elves",
        coverPath: "/images/book-covers/witcher1.jpg"
      },
      {
        title: "Time of contempt",
        coverPath: "/images/book-covers/witcher2.jpg"
      },
      {
        title: "Baptism of fire",
        coverPath: "/images/book-covers/witcher3.jpg"
      },
      {
        title: "The tower of the swallow",
        coverPath: "/images/book-covers/witcher4.jpg"
      },
      {
        title: "The lady of the lake",
        coverPath: "/images/book-covers/witcher5.jpg"
      }
    ]
  }
];

createConnection(config)
  .then(async (connection) => {
    const users = connection.manager.create(User, usersData);
    await connection.manager.save(users);

    const authors = connection.manager.create(Author, authorsAndBooksData);
    await connection.manager.save(authors);

    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
