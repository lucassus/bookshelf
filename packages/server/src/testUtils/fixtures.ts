import { getConnection } from "typeorm";

import { Author } from "../database/entity/Author";
import { Book } from "../database/entity/Book";
import { User } from "../database/entity/User";

function loadAuthors() {
  const { manager } = getConnection();

  return manager.insert(Author, [
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
}

async function loadBooks() {
  const { manager } = getConnection();

  let author = await manager.findOne(Author, { name: "J. K. Rowling" });
  await manager.insert(Book, [
    {
      authorId: author.id,
      title: "Harry Potter and the Sorcerer's Stone",
      coverPath: "/images/book-covers/harry1.jpg"
    },
    {
      authorId: author.id,
      title: "Harry Potter and the Chamber of Secrets",
      coverPath: "/images/book-covers/harry2.jpg"
    },
    {
      authorId: author.id,
      title: "Harry Potter and the Prisoner of Azkaban",
      coverPath: "/images/book-covers/harry3.jpg"
    },
    {
      authorId: author.id,
      title: "Harry Potter and the Goblet of Fire",
      coverPath: "/images/book-covers/harry4.jpg"
    },
    {
      authorId: author.id,
      title: "Harry Potter and the Order of the Phoenix",
      coverPath: "/images/book-covers/harry5.jpg"
    },
    {
      authorId: author.id,
      title: "Harry Potter and the Half-Blood Prince",
      coverPath: "/images/book-covers/harry6.jpg"
    },
    {
      authorId: author.id,
      title: "Harry Potter and the Deathly Hallows",
      coverPath: "/images/book-covers/harry7.jpg"
    }
  ]);

  author = await manager.findOne(Author, { name: "James S. A. Corey" });
  await manager.insert(Book, [
    {
      authorId: author.id,
      title: "Leviathan Wakes",
      coverPath: "/images/book-covers/expanse1.jpg"
    },
    {
      authorId: author.id,
      title: "Caliban's War",
      coverPath: "/images/book-covers/expanse2.jpg"
    },
    {
      authorId: author.id,
      title: "Abaddon's Gate",
      coverPath: "/images/book-covers/expanse3.jpg"
    },
    {
      authorId: author.id,
      title: "Cibola Burn",
      coverPath: "/images/book-covers/expanse4.jpg"
    },
    {
      authorId: author.id,
      title: "Nemesis Games",
      coverPath: "/images/book-covers/expanse5.jpg"
    },
    {
      authorId: author.id,
      title: "Babylon's Ashes",
      coverPath: "/images/book-covers/expanse6.jpg"
    },
    {
      authorId: author.id,
      title: "Persepolis Rising",
      coverPath: "/images/book-covers/expanse7.jpg"
    },
    {
      authorId: author.id,
      title: "Tiamat's Wrath",
      coverPath: "/images/book-covers/expanse8.jpg"
    }
  ]);

  author = await manager.findOne(Author, { name: "Andrzej Sapkowski" });
  await manager.insert(Book, [
    {
      authorId: author.id,
      title: "Blood of Elves",
      coverPath: "/images/book-covers/witcher1.jpg"
    },
    {
      authorId: author.id,
      title: "Time of contempt",
      coverPath: "/images/book-covers/witcher2.jpg"
    },
    {
      authorId: author.id,
      title: "Baptism of fire",
      coverPath: "/images/book-covers/witcher3.jpg"
    },
    {
      authorId: author.id,
      title: "The tower of the swallow",
      coverPath: "/images/book-covers/witcher4.jpg"
    },
    {
      authorId: author.id,
      title: "The lady of the lake",
      coverPath: "/images/book-covers/witcher5.jpg"
    }
  ]);
}

async function loadUsers() {
  const { manager } = getConnection();

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
}

export const loadFixtures = async () => {
  await loadAuthors();
  await loadBooks();
  await loadUsers();
};
