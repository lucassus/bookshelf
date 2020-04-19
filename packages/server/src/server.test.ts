import { gql } from "apollo-server";
import { createTestClient } from "apollo-server-testing";

import { server } from "./server";

it("fetches the message", async () => {
  // Given
  const { query } = createTestClient(server);

  const MESSAGE_QUERY = gql`
    query {
      message
    }
  `;

  // When
  const res = await query({ query: MESSAGE_QUERY });

  // Then
  expect(res.data).not.toBeUndefined();
  expect(res.data.message).toEqual("Hello World!");
});

it("fetches books", async () => {
  // Given
  const { query } = createTestClient(server);

  const BOOKS_QUERY = gql`
    query {
      books {
        title
        cover {
          url
        }
      }
    }
  `;

  // When
  const res = await query({ query: BOOKS_QUERY });

  // Then
  expect(res.data).not.toBeUndefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "books": Array [
        Object {
          "cover": Object {
            "url": "http://examples.devmastery.pl/assets/images/book-covers/harry1.jpg",
          },
          "title": "Harry Potter and the Sorcerer's Stone",
        },
        Object {
          "cover": Object {
            "url": "http://examples.devmastery.pl/assets/images/book-covers/harry2.jpg",
          },
          "title": "Harry Potter and the Chamber of Secrets",
        },
        Object {
          "cover": Object {
            "url": "http://examples.devmastery.pl/assets/images/book-covers/harry3.jpg",
          },
          "title": "Harry Potter and the Prisoner of Azkaban",
        },
        Object {
          "cover": Object {
            "url": "http://examples.devmastery.pl/assets/images/book-covers/harry4.jpg",
          },
          "title": "Harry Potter and the Goblet of Fire",
        },
        Object {
          "cover": Object {
            "url": "http://examples.devmastery.pl/assets/images/book-covers/harry5.jpg",
          },
          "title": "Harry Potter and the Order of the Phoenix",
        },
        Object {
          "cover": Object {
            "url": "http://examples.devmastery.pl/assets/images/book-covers/harry6.jpg",
          },
          "title": "Harry Potter and the Half-Blood Prince",
        },
        Object {
          "cover": Object {
            "url": "http://examples.devmastery.pl/assets/images/book-covers/harry7.jpg",
          },
          "title": "Harry Potter and the Deathly Hallows",
        },
        Object {
          "cover": Object {
            "url": "http://examples.devmastery.pl/assets/images/book-covers/expanse1.jpg",
          },
          "title": "Leviathan Wakes",
        },
        Object {
          "cover": Object {
            "url": "http://examples.devmastery.pl/assets/images/book-covers/expanse2.jpg",
          },
          "title": "Caliban's War",
        },
        Object {
          "cover": Object {
            "url": "http://examples.devmastery.pl/assets/images/book-covers/expanse3.jpg",
          },
          "title": "Abaddon's Gate",
        },
        Object {
          "cover": Object {
            "url": "http://examples.devmastery.pl/assets/images/book-covers/expanse4.jpg",
          },
          "title": "Cibola Burn",
        },
        Object {
          "cover": Object {
            "url": "http://examples.devmastery.pl/assets/images/book-covers/expanse5.jpg",
          },
          "title": "Nemesis Games",
        },
        Object {
          "cover": Object {
            "url": "http://examples.devmastery.pl/assets/images/book-covers/expanse6.jpg",
          },
          "title": "Babylon's Ashes",
        },
        Object {
          "cover": Object {
            "url": "http://examples.devmastery.pl/assets/images/book-covers/expanse7.jpg",
          },
          "title": "Persepolis Rising",
        },
        Object {
          "cover": Object {
            "url": "http://examples.devmastery.pl/assets/images/book-covers/expanse8.jpg",
          },
          "title": "Tiamat's Wrath",
        },
        Object {
          "cover": Object {
            "url": "http://examples.devmastery.pl/assets/images/book-covers/witcher1.jpg",
          },
          "title": "Blood of Elves",
        },
        Object {
          "cover": Object {
            "url": "http://examples.devmastery.pl/assets/images/book-covers/witcher2.jpg",
          },
          "title": "Time of contempt",
        },
        Object {
          "cover": Object {
            "url": "http://examples.devmastery.pl/assets/images/book-covers/witcher3.jpg",
          },
          "title": "Baptism of fire",
        },
        Object {
          "cover": Object {
            "url": "http://examples.devmastery.pl/assets/images/book-covers/witcher4.jpg",
          },
          "title": "The tower of the swallow",
        },
        Object {
          "cover": Object {
            "url": "http://examples.devmastery.pl/assets/images/book-covers/witcher5.jpg",
          },
          "title": "The lady of the lake",
        },
      ],
    }
  `);
});

it("fetches authors along with books", async () => {
  // Given
  const { query } = createTestClient(server);

  const AUTHORS_QUERY = gql`
    query {
      authors {
        name
        books {
          title
        }
      }
    }
  `;

  // When
  const res = await query({ query: AUTHORS_QUERY });

  // Then
  expect(res.data).not.toBeUndefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "authors": Array [
        Object {
          "books": Array [
            Object {
              "title": "Harry Potter and the Sorcerer's Stone",
            },
            Object {
              "title": "Harry Potter and the Chamber of Secrets",
            },
            Object {
              "title": "Harry Potter and the Prisoner of Azkaban",
            },
            Object {
              "title": "Harry Potter and the Goblet of Fire",
            },
            Object {
              "title": "Harry Potter and the Order of the Phoenix",
            },
            Object {
              "title": "Harry Potter and the Half-Blood Prince",
            },
            Object {
              "title": "Harry Potter and the Deathly Hallows",
            },
          ],
          "name": "J. K. Rowling",
        },
        Object {
          "books": Array [
            Object {
              "title": "Leviathan Wakes",
            },
            Object {
              "title": "Caliban's War",
            },
            Object {
              "title": "Abaddon's Gate",
            },
            Object {
              "title": "Cibola Burn",
            },
            Object {
              "title": "Nemesis Games",
            },
            Object {
              "title": "Babylon's Ashes",
            },
            Object {
              "title": "Persepolis Rising",
            },
          ],
          "name": "James S. A. Corey",
        },
        Object {
          "books": Array [
            Object {
              "title": "Tiamat's Wrath",
            },
            Object {
              "title": "Blood of Elves",
            },
            Object {
              "title": "Time of contempt",
            },
            Object {
              "title": "Baptism of fire",
            },
            Object {
              "title": "The tower of the swallow",
            },
            Object {
              "title": "The lady of the lake",
            },
          ],
          "name": "Andrzej Sapkowski",
        },
      ],
    }
  `);
});

it("fetches books along with authors and books again", async () => {
  // Given
  const { query } = createTestClient(server);

  const BOOKS_QUERY = gql`
    query {
      books {
        title
        author {
          name
          books {
            title
          }
        }
      }
    }
  `;

  // When
  const res = await query({ query: BOOKS_QUERY });

  // Then
  expect(res.data).not.toBeUndefined();
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "books": Array [
        Object {
          "author": Object {
            "books": Array [
              Object {
                "title": "Harry Potter and the Sorcerer's Stone",
              },
              Object {
                "title": "Harry Potter and the Chamber of Secrets",
              },
              Object {
                "title": "Harry Potter and the Prisoner of Azkaban",
              },
              Object {
                "title": "Harry Potter and the Goblet of Fire",
              },
              Object {
                "title": "Harry Potter and the Order of the Phoenix",
              },
              Object {
                "title": "Harry Potter and the Half-Blood Prince",
              },
              Object {
                "title": "Harry Potter and the Deathly Hallows",
              },
            ],
            "name": "J. K. Rowling",
          },
          "title": "Harry Potter and the Sorcerer's Stone",
        },
        Object {
          "author": Object {
            "books": Array [
              Object {
                "title": "Harry Potter and the Sorcerer's Stone",
              },
              Object {
                "title": "Harry Potter and the Chamber of Secrets",
              },
              Object {
                "title": "Harry Potter and the Prisoner of Azkaban",
              },
              Object {
                "title": "Harry Potter and the Goblet of Fire",
              },
              Object {
                "title": "Harry Potter and the Order of the Phoenix",
              },
              Object {
                "title": "Harry Potter and the Half-Blood Prince",
              },
              Object {
                "title": "Harry Potter and the Deathly Hallows",
              },
            ],
            "name": "J. K. Rowling",
          },
          "title": "Harry Potter and the Chamber of Secrets",
        },
        Object {
          "author": Object {
            "books": Array [
              Object {
                "title": "Harry Potter and the Sorcerer's Stone",
              },
              Object {
                "title": "Harry Potter and the Chamber of Secrets",
              },
              Object {
                "title": "Harry Potter and the Prisoner of Azkaban",
              },
              Object {
                "title": "Harry Potter and the Goblet of Fire",
              },
              Object {
                "title": "Harry Potter and the Order of the Phoenix",
              },
              Object {
                "title": "Harry Potter and the Half-Blood Prince",
              },
              Object {
                "title": "Harry Potter and the Deathly Hallows",
              },
            ],
            "name": "J. K. Rowling",
          },
          "title": "Harry Potter and the Prisoner of Azkaban",
        },
        Object {
          "author": Object {
            "books": Array [
              Object {
                "title": "Harry Potter and the Sorcerer's Stone",
              },
              Object {
                "title": "Harry Potter and the Chamber of Secrets",
              },
              Object {
                "title": "Harry Potter and the Prisoner of Azkaban",
              },
              Object {
                "title": "Harry Potter and the Goblet of Fire",
              },
              Object {
                "title": "Harry Potter and the Order of the Phoenix",
              },
              Object {
                "title": "Harry Potter and the Half-Blood Prince",
              },
              Object {
                "title": "Harry Potter and the Deathly Hallows",
              },
            ],
            "name": "J. K. Rowling",
          },
          "title": "Harry Potter and the Goblet of Fire",
        },
        Object {
          "author": Object {
            "books": Array [
              Object {
                "title": "Harry Potter and the Sorcerer's Stone",
              },
              Object {
                "title": "Harry Potter and the Chamber of Secrets",
              },
              Object {
                "title": "Harry Potter and the Prisoner of Azkaban",
              },
              Object {
                "title": "Harry Potter and the Goblet of Fire",
              },
              Object {
                "title": "Harry Potter and the Order of the Phoenix",
              },
              Object {
                "title": "Harry Potter and the Half-Blood Prince",
              },
              Object {
                "title": "Harry Potter and the Deathly Hallows",
              },
            ],
            "name": "J. K. Rowling",
          },
          "title": "Harry Potter and the Order of the Phoenix",
        },
        Object {
          "author": Object {
            "books": Array [
              Object {
                "title": "Harry Potter and the Sorcerer's Stone",
              },
              Object {
                "title": "Harry Potter and the Chamber of Secrets",
              },
              Object {
                "title": "Harry Potter and the Prisoner of Azkaban",
              },
              Object {
                "title": "Harry Potter and the Goblet of Fire",
              },
              Object {
                "title": "Harry Potter and the Order of the Phoenix",
              },
              Object {
                "title": "Harry Potter and the Half-Blood Prince",
              },
              Object {
                "title": "Harry Potter and the Deathly Hallows",
              },
            ],
            "name": "J. K. Rowling",
          },
          "title": "Harry Potter and the Half-Blood Prince",
        },
        Object {
          "author": Object {
            "books": Array [
              Object {
                "title": "Harry Potter and the Sorcerer's Stone",
              },
              Object {
                "title": "Harry Potter and the Chamber of Secrets",
              },
              Object {
                "title": "Harry Potter and the Prisoner of Azkaban",
              },
              Object {
                "title": "Harry Potter and the Goblet of Fire",
              },
              Object {
                "title": "Harry Potter and the Order of the Phoenix",
              },
              Object {
                "title": "Harry Potter and the Half-Blood Prince",
              },
              Object {
                "title": "Harry Potter and the Deathly Hallows",
              },
            ],
            "name": "J. K. Rowling",
          },
          "title": "Harry Potter and the Deathly Hallows",
        },
        Object {
          "author": Object {
            "books": Array [
              Object {
                "title": "Leviathan Wakes",
              },
              Object {
                "title": "Caliban's War",
              },
              Object {
                "title": "Abaddon's Gate",
              },
              Object {
                "title": "Cibola Burn",
              },
              Object {
                "title": "Nemesis Games",
              },
              Object {
                "title": "Babylon's Ashes",
              },
              Object {
                "title": "Persepolis Rising",
              },
            ],
            "name": "James S. A. Corey",
          },
          "title": "Leviathan Wakes",
        },
        Object {
          "author": Object {
            "books": Array [
              Object {
                "title": "Leviathan Wakes",
              },
              Object {
                "title": "Caliban's War",
              },
              Object {
                "title": "Abaddon's Gate",
              },
              Object {
                "title": "Cibola Burn",
              },
              Object {
                "title": "Nemesis Games",
              },
              Object {
                "title": "Babylon's Ashes",
              },
              Object {
                "title": "Persepolis Rising",
              },
            ],
            "name": "James S. A. Corey",
          },
          "title": "Caliban's War",
        },
        Object {
          "author": Object {
            "books": Array [
              Object {
                "title": "Leviathan Wakes",
              },
              Object {
                "title": "Caliban's War",
              },
              Object {
                "title": "Abaddon's Gate",
              },
              Object {
                "title": "Cibola Burn",
              },
              Object {
                "title": "Nemesis Games",
              },
              Object {
                "title": "Babylon's Ashes",
              },
              Object {
                "title": "Persepolis Rising",
              },
            ],
            "name": "James S. A. Corey",
          },
          "title": "Abaddon's Gate",
        },
        Object {
          "author": Object {
            "books": Array [
              Object {
                "title": "Leviathan Wakes",
              },
              Object {
                "title": "Caliban's War",
              },
              Object {
                "title": "Abaddon's Gate",
              },
              Object {
                "title": "Cibola Burn",
              },
              Object {
                "title": "Nemesis Games",
              },
              Object {
                "title": "Babylon's Ashes",
              },
              Object {
                "title": "Persepolis Rising",
              },
            ],
            "name": "James S. A. Corey",
          },
          "title": "Cibola Burn",
        },
        Object {
          "author": Object {
            "books": Array [
              Object {
                "title": "Leviathan Wakes",
              },
              Object {
                "title": "Caliban's War",
              },
              Object {
                "title": "Abaddon's Gate",
              },
              Object {
                "title": "Cibola Burn",
              },
              Object {
                "title": "Nemesis Games",
              },
              Object {
                "title": "Babylon's Ashes",
              },
              Object {
                "title": "Persepolis Rising",
              },
            ],
            "name": "James S. A. Corey",
          },
          "title": "Nemesis Games",
        },
        Object {
          "author": Object {
            "books": Array [
              Object {
                "title": "Leviathan Wakes",
              },
              Object {
                "title": "Caliban's War",
              },
              Object {
                "title": "Abaddon's Gate",
              },
              Object {
                "title": "Cibola Burn",
              },
              Object {
                "title": "Nemesis Games",
              },
              Object {
                "title": "Babylon's Ashes",
              },
              Object {
                "title": "Persepolis Rising",
              },
            ],
            "name": "James S. A. Corey",
          },
          "title": "Babylon's Ashes",
        },
        Object {
          "author": Object {
            "books": Array [
              Object {
                "title": "Leviathan Wakes",
              },
              Object {
                "title": "Caliban's War",
              },
              Object {
                "title": "Abaddon's Gate",
              },
              Object {
                "title": "Cibola Burn",
              },
              Object {
                "title": "Nemesis Games",
              },
              Object {
                "title": "Babylon's Ashes",
              },
              Object {
                "title": "Persepolis Rising",
              },
            ],
            "name": "James S. A. Corey",
          },
          "title": "Persepolis Rising",
        },
        Object {
          "author": Object {
            "books": Array [
              Object {
                "title": "Tiamat's Wrath",
              },
              Object {
                "title": "Blood of Elves",
              },
              Object {
                "title": "Time of contempt",
              },
              Object {
                "title": "Baptism of fire",
              },
              Object {
                "title": "The tower of the swallow",
              },
              Object {
                "title": "The lady of the lake",
              },
            ],
            "name": "Andrzej Sapkowski",
          },
          "title": "Tiamat's Wrath",
        },
        Object {
          "author": Object {
            "books": Array [
              Object {
                "title": "Tiamat's Wrath",
              },
              Object {
                "title": "Blood of Elves",
              },
              Object {
                "title": "Time of contempt",
              },
              Object {
                "title": "Baptism of fire",
              },
              Object {
                "title": "The tower of the swallow",
              },
              Object {
                "title": "The lady of the lake",
              },
            ],
            "name": "Andrzej Sapkowski",
          },
          "title": "Blood of Elves",
        },
        Object {
          "author": Object {
            "books": Array [
              Object {
                "title": "Tiamat's Wrath",
              },
              Object {
                "title": "Blood of Elves",
              },
              Object {
                "title": "Time of contempt",
              },
              Object {
                "title": "Baptism of fire",
              },
              Object {
                "title": "The tower of the swallow",
              },
              Object {
                "title": "The lady of the lake",
              },
            ],
            "name": "Andrzej Sapkowski",
          },
          "title": "Time of contempt",
        },
        Object {
          "author": Object {
            "books": Array [
              Object {
                "title": "Tiamat's Wrath",
              },
              Object {
                "title": "Blood of Elves",
              },
              Object {
                "title": "Time of contempt",
              },
              Object {
                "title": "Baptism of fire",
              },
              Object {
                "title": "The tower of the swallow",
              },
              Object {
                "title": "The lady of the lake",
              },
            ],
            "name": "Andrzej Sapkowski",
          },
          "title": "Baptism of fire",
        },
        Object {
          "author": Object {
            "books": Array [
              Object {
                "title": "Tiamat's Wrath",
              },
              Object {
                "title": "Blood of Elves",
              },
              Object {
                "title": "Time of contempt",
              },
              Object {
                "title": "Baptism of fire",
              },
              Object {
                "title": "The tower of the swallow",
              },
              Object {
                "title": "The lady of the lake",
              },
            ],
            "name": "Andrzej Sapkowski",
          },
          "title": "The tower of the swallow",
        },
        Object {
          "author": Object {
            "books": Array [
              Object {
                "title": "Tiamat's Wrath",
              },
              Object {
                "title": "Blood of Elves",
              },
              Object {
                "title": "Time of contempt",
              },
              Object {
                "title": "Baptism of fire",
              },
              Object {
                "title": "The tower of the swallow",
              },
              Object {
                "title": "The lady of the lake",
              },
            ],
            "name": "Andrzej Sapkowski",
          },
          "title": "The lady of the lake",
        },
      ],
    }
  `);
});
