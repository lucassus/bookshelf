// TODO: Figure out how to fix it

// import { gql } from "apollo-server-express";
// import { createTestClient } from "apollo-server-testing";
//
// import { db } from "./db";
// import { server } from "./server";
//
// it("fetches books", async () => {
//   // Given
//   const { query } = createTestClient(server);
//
//   const BOOKS_QUERY = gql`
//     query {
//       books {
//         id
//         title
//         cover {
//           url
//         }
//       }
//     }
//   `;
//
//   // When
//   const res = await query({ query: BOOKS_QUERY });
//
//   // Then
//   expect(res.data).not.toBeUndefined();
//   expect(res.data).toMatchInlineSnapshot(`
//     Object {
//       "books": Array [
//         Object {
//           "cover": Object {
//             "url": "http://examples.devmastery.pl/assets/images/book-covers/harry1.jpg",
//           },
//           "id": 1,
//           "title": "Harry Potter and the Sorcerer's Stone",
//         },
//         Object {
//           "cover": Object {
//             "url": "http://examples.devmastery.pl/assets/images/book-covers/harry2.jpg",
//           },
//           "id": 2,
//           "title": "Harry Potter and the Chamber of Secrets",
//         },
//         Object {
//           "cover": Object {
//             "url": "http://examples.devmastery.pl/assets/images/book-covers/harry3.jpg",
//           },
//           "id": 3,
//           "title": "Harry Potter and the Prisoner of Azkaban",
//         },
//         Object {
//           "cover": Object {
//             "url": "http://examples.devmastery.pl/assets/images/book-covers/harry4.jpg",
//           },
//           "id": 4,
//           "title": "Harry Potter and the Goblet of Fire",
//         },
//         Object {
//           "cover": Object {
//             "url": "http://examples.devmastery.pl/assets/images/book-covers/harry5.jpg",
//           },
//           "id": 5,
//           "title": "Harry Potter and the Order of the Phoenix",
//         },
//         Object {
//           "cover": Object {
//             "url": "http://examples.devmastery.pl/assets/images/book-covers/harry6.jpg",
//           },
//           "id": 6,
//           "title": "Harry Potter and the Half-Blood Prince",
//         },
//         Object {
//           "cover": Object {
//             "url": "http://examples.devmastery.pl/assets/images/book-covers/harry7.jpg",
//           },
//           "id": 7,
//           "title": "Harry Potter and the Deathly Hallows",
//         },
//         Object {
//           "cover": Object {
//             "url": "http://examples.devmastery.pl/assets/images/book-covers/expanse1.jpg",
//           },
//           "id": 8,
//           "title": "Leviathan Wakes",
//         },
//         Object {
//           "cover": Object {
//             "url": "http://examples.devmastery.pl/assets/images/book-covers/expanse2.jpg",
//           },
//           "id": 9,
//           "title": "Caliban's War",
//         },
//         Object {
//           "cover": Object {
//             "url": "http://examples.devmastery.pl/assets/images/book-covers/expanse3.jpg",
//           },
//           "id": 10,
//           "title": "Abaddon's Gate",
//         },
//         Object {
//           "cover": Object {
//             "url": "http://examples.devmastery.pl/assets/images/book-covers/expanse4.jpg",
//           },
//           "id": 11,
//           "title": "Cibola Burn",
//         },
//         Object {
//           "cover": Object {
//             "url": "http://examples.devmastery.pl/assets/images/book-covers/expanse5.jpg",
//           },
//           "id": 12,
//           "title": "Nemesis Games",
//         },
//         Object {
//           "cover": Object {
//             "url": "http://examples.devmastery.pl/assets/images/book-covers/expanse6.jpg",
//           },
//           "id": 13,
//           "title": "Babylon's Ashes",
//         },
//         Object {
//           "cover": Object {
//             "url": "http://examples.devmastery.pl/assets/images/book-covers/expanse7.jpg",
//           },
//           "id": 14,
//           "title": "Persepolis Rising",
//         },
//         Object {
//           "cover": Object {
//             "url": "http://examples.devmastery.pl/assets/images/book-covers/expanse8.jpg",
//           },
//           "id": 15,
//           "title": "Tiamat's Wrath",
//         },
//         Object {
//           "cover": Object {
//             "url": "http://examples.devmastery.pl/assets/images/book-covers/witcher1.jpg",
//           },
//           "id": 16,
//           "title": "Blood of Elves",
//         },
//         Object {
//           "cover": Object {
//             "url": "http://examples.devmastery.pl/assets/images/book-covers/witcher2.jpg",
//           },
//           "id": 17,
//           "title": "Time of contempt",
//         },
//         Object {
//           "cover": Object {
//             "url": "http://examples.devmastery.pl/assets/images/book-covers/witcher3.jpg",
//           },
//           "id": 18,
//           "title": "Baptism of fire",
//         },
//         Object {
//           "cover": Object {
//             "url": "http://examples.devmastery.pl/assets/images/book-covers/witcher4.jpg",
//           },
//           "id": 19,
//           "title": "The tower of the swallow",
//         },
//         Object {
//           "cover": Object {
//             "url": "http://examples.devmastery.pl/assets/images/book-covers/witcher5.jpg",
//           },
//           "id": 20,
//           "title": "The lady of the lake",
//         },
//       ],
//     }
//   `);
// });
//
// it("fetches authors along with books", async () => {
//   // Given
//   const { query } = createTestClient(server);
//
//   const AUTHORS_QUERY = gql`
//     query {
//       authors {
//         name
//         books {
//           title
//         }
//       }
//     }
//   `;
//
//   // When
//   const res = await query({ query: AUTHORS_QUERY });
//
//   // Then
//   expect(res.data).not.toBeUndefined();
//   expect(res.data).toMatchInlineSnapshot(`
//     Object {
//       "authors": Array [
//         Object {
//           "books": Array [
//             Object {
//               "title": "Harry Potter and the Sorcerer's Stone",
//             },
//             Object {
//               "title": "Harry Potter and the Chamber of Secrets",
//             },
//             Object {
//               "title": "Harry Potter and the Prisoner of Azkaban",
//             },
//             Object {
//               "title": "Harry Potter and the Goblet of Fire",
//             },
//             Object {
//               "title": "Harry Potter and the Order of the Phoenix",
//             },
//             Object {
//               "title": "Harry Potter and the Half-Blood Prince",
//             },
//             Object {
//               "title": "Harry Potter and the Deathly Hallows",
//             },
//           ],
//           "name": "J. K. Rowling",
//         },
//         Object {
//           "books": Array [
//             Object {
//               "title": "Leviathan Wakes",
//             },
//             Object {
//               "title": "Caliban's War",
//             },
//             Object {
//               "title": "Abaddon's Gate",
//             },
//             Object {
//               "title": "Cibola Burn",
//             },
//             Object {
//               "title": "Nemesis Games",
//             },
//             Object {
//               "title": "Babylon's Ashes",
//             },
//             Object {
//               "title": "Persepolis Rising",
//             },
//           ],
//           "name": "James S. A. Corey",
//         },
//         Object {
//           "books": Array [
//             Object {
//               "title": "Tiamat's Wrath",
//             },
//             Object {
//               "title": "Blood of Elves",
//             },
//             Object {
//               "title": "Time of contempt",
//             },
//             Object {
//               "title": "Baptism of fire",
//             },
//             Object {
//               "title": "The tower of the swallow",
//             },
//             Object {
//               "title": "The lady of the lake",
//             },
//           ],
//           "name": "Andrzej Sapkowski",
//         },
//       ],
//     }
//   `);
// });
//
// it("fetches an author", async () => {
//   const { query } = createTestClient(server);
//
//   const AUTHOR_QUERY = gql`
//     query {
//       author(id: 1) {
//         id
//         name
//         books {
//           title
//         }
//       }
//     }
//   `;
//
//   // When
//   const res = await query({ query: AUTHOR_QUERY });
//
//   // Then
//   expect(res.data).not.toBeUndefined();
//   expect(res.data).toMatchInlineSnapshot(`
//     Object {
//       "author": Object {
//         "books": Array [
//           Object {
//             "title": "Harry Potter and the Sorcerer's Stone",
//           },
//           Object {
//             "title": "Harry Potter and the Chamber of Secrets",
//           },
//           Object {
//             "title": "Harry Potter and the Prisoner of Azkaban",
//           },
//           Object {
//             "title": "Harry Potter and the Goblet of Fire",
//           },
//           Object {
//             "title": "Harry Potter and the Order of the Phoenix",
//           },
//           Object {
//             "title": "Harry Potter and the Half-Blood Prince",
//           },
//           Object {
//             "title": "Harry Potter and the Deathly Hallows",
//           },
//         ],
//         "id": 1,
//         "name": "J. K. Rowling",
//       },
//     }
//   `);
// });
//
// it("fetches books along with authors and books again", async () => {
//   // Given
//   const { query } = createTestClient(server);
//
//   const BOOKS_QUERY = gql`
//     query {
//       books {
//         title
//         author {
//           name
//           books {
//             title
//           }
//         }
//       }
//     }
//   `;
//
//   // When
//   const res = await query({ query: BOOKS_QUERY });
//
//   // Then
//   expect(res.data).not.toBeUndefined();
//   expect(res.data).toMatchInlineSnapshot(`
//     Object {
//       "books": Array [
//         Object {
//           "author": Object {
//             "books": Array [
//               Object {
//                 "title": "Harry Potter and the Sorcerer's Stone",
//               },
//               Object {
//                 "title": "Harry Potter and the Chamber of Secrets",
//               },
//               Object {
//                 "title": "Harry Potter and the Prisoner of Azkaban",
//               },
//               Object {
//                 "title": "Harry Potter and the Goblet of Fire",
//               },
//               Object {
//                 "title": "Harry Potter and the Order of the Phoenix",
//               },
//               Object {
//                 "title": "Harry Potter and the Half-Blood Prince",
//               },
//               Object {
//                 "title": "Harry Potter and the Deathly Hallows",
//               },
//             ],
//             "name": "J. K. Rowling",
//           },
//           "title": "Harry Potter and the Sorcerer's Stone",
//         },
//         Object {
//           "author": Object {
//             "books": Array [
//               Object {
//                 "title": "Harry Potter and the Sorcerer's Stone",
//               },
//               Object {
//                 "title": "Harry Potter and the Chamber of Secrets",
//               },
//               Object {
//                 "title": "Harry Potter and the Prisoner of Azkaban",
//               },
//               Object {
//                 "title": "Harry Potter and the Goblet of Fire",
//               },
//               Object {
//                 "title": "Harry Potter and the Order of the Phoenix",
//               },
//               Object {
//                 "title": "Harry Potter and the Half-Blood Prince",
//               },
//               Object {
//                 "title": "Harry Potter and the Deathly Hallows",
//               },
//             ],
//             "name": "J. K. Rowling",
//           },
//           "title": "Harry Potter and the Chamber of Secrets",
//         },
//         Object {
//           "author": Object {
//             "books": Array [
//               Object {
//                 "title": "Harry Potter and the Sorcerer's Stone",
//               },
//               Object {
//                 "title": "Harry Potter and the Chamber of Secrets",
//               },
//               Object {
//                 "title": "Harry Potter and the Prisoner of Azkaban",
//               },
//               Object {
//                 "title": "Harry Potter and the Goblet of Fire",
//               },
//               Object {
//                 "title": "Harry Potter and the Order of the Phoenix",
//               },
//               Object {
//                 "title": "Harry Potter and the Half-Blood Prince",
//               },
//               Object {
//                 "title": "Harry Potter and the Deathly Hallows",
//               },
//             ],
//             "name": "J. K. Rowling",
//           },
//           "title": "Harry Potter and the Prisoner of Azkaban",
//         },
//         Object {
//           "author": Object {
//             "books": Array [
//               Object {
//                 "title": "Harry Potter and the Sorcerer's Stone",
//               },
//               Object {
//                 "title": "Harry Potter and the Chamber of Secrets",
//               },
//               Object {
//                 "title": "Harry Potter and the Prisoner of Azkaban",
//               },
//               Object {
//                 "title": "Harry Potter and the Goblet of Fire",
//               },
//               Object {
//                 "title": "Harry Potter and the Order of the Phoenix",
//               },
//               Object {
//                 "title": "Harry Potter and the Half-Blood Prince",
//               },
//               Object {
//                 "title": "Harry Potter and the Deathly Hallows",
//               },
//             ],
//             "name": "J. K. Rowling",
//           },
//           "title": "Harry Potter and the Goblet of Fire",
//         },
//         Object {
//           "author": Object {
//             "books": Array [
//               Object {
//                 "title": "Harry Potter and the Sorcerer's Stone",
//               },
//               Object {
//                 "title": "Harry Potter and the Chamber of Secrets",
//               },
//               Object {
//                 "title": "Harry Potter and the Prisoner of Azkaban",
//               },
//               Object {
//                 "title": "Harry Potter and the Goblet of Fire",
//               },
//               Object {
//                 "title": "Harry Potter and the Order of the Phoenix",
//               },
//               Object {
//                 "title": "Harry Potter and the Half-Blood Prince",
//               },
//               Object {
//                 "title": "Harry Potter and the Deathly Hallows",
//               },
//             ],
//             "name": "J. K. Rowling",
//           },
//           "title": "Harry Potter and the Order of the Phoenix",
//         },
//         Object {
//           "author": Object {
//             "books": Array [
//               Object {
//                 "title": "Harry Potter and the Sorcerer's Stone",
//               },
//               Object {
//                 "title": "Harry Potter and the Chamber of Secrets",
//               },
//               Object {
//                 "title": "Harry Potter and the Prisoner of Azkaban",
//               },
//               Object {
//                 "title": "Harry Potter and the Goblet of Fire",
//               },
//               Object {
//                 "title": "Harry Potter and the Order of the Phoenix",
//               },
//               Object {
//                 "title": "Harry Potter and the Half-Blood Prince",
//               },
//               Object {
//                 "title": "Harry Potter and the Deathly Hallows",
//               },
//             ],
//             "name": "J. K. Rowling",
//           },
//           "title": "Harry Potter and the Half-Blood Prince",
//         },
//         Object {
//           "author": Object {
//             "books": Array [
//               Object {
//                 "title": "Harry Potter and the Sorcerer's Stone",
//               },
//               Object {
//                 "title": "Harry Potter and the Chamber of Secrets",
//               },
//               Object {
//                 "title": "Harry Potter and the Prisoner of Azkaban",
//               },
//               Object {
//                 "title": "Harry Potter and the Goblet of Fire",
//               },
//               Object {
//                 "title": "Harry Potter and the Order of the Phoenix",
//               },
//               Object {
//                 "title": "Harry Potter and the Half-Blood Prince",
//               },
//               Object {
//                 "title": "Harry Potter and the Deathly Hallows",
//               },
//             ],
//             "name": "J. K. Rowling",
//           },
//           "title": "Harry Potter and the Deathly Hallows",
//         },
//         Object {
//           "author": Object {
//             "books": Array [
//               Object {
//                 "title": "Leviathan Wakes",
//               },
//               Object {
//                 "title": "Caliban's War",
//               },
//               Object {
//                 "title": "Abaddon's Gate",
//               },
//               Object {
//                 "title": "Cibola Burn",
//               },
//               Object {
//                 "title": "Nemesis Games",
//               },
//               Object {
//                 "title": "Babylon's Ashes",
//               },
//               Object {
//                 "title": "Persepolis Rising",
//               },
//             ],
//             "name": "James S. A. Corey",
//           },
//           "title": "Leviathan Wakes",
//         },
//         Object {
//           "author": Object {
//             "books": Array [
//               Object {
//                 "title": "Leviathan Wakes",
//               },
//               Object {
//                 "title": "Caliban's War",
//               },
//               Object {
//                 "title": "Abaddon's Gate",
//               },
//               Object {
//                 "title": "Cibola Burn",
//               },
//               Object {
//                 "title": "Nemesis Games",
//               },
//               Object {
//                 "title": "Babylon's Ashes",
//               },
//               Object {
//                 "title": "Persepolis Rising",
//               },
//             ],
//             "name": "James S. A. Corey",
//           },
//           "title": "Caliban's War",
//         },
//         Object {
//           "author": Object {
//             "books": Array [
//               Object {
//                 "title": "Leviathan Wakes",
//               },
//               Object {
//                 "title": "Caliban's War",
//               },
//               Object {
//                 "title": "Abaddon's Gate",
//               },
//               Object {
//                 "title": "Cibola Burn",
//               },
//               Object {
//                 "title": "Nemesis Games",
//               },
//               Object {
//                 "title": "Babylon's Ashes",
//               },
//               Object {
//                 "title": "Persepolis Rising",
//               },
//             ],
//             "name": "James S. A. Corey",
//           },
//           "title": "Abaddon's Gate",
//         },
//         Object {
//           "author": Object {
//             "books": Array [
//               Object {
//                 "title": "Leviathan Wakes",
//               },
//               Object {
//                 "title": "Caliban's War",
//               },
//               Object {
//                 "title": "Abaddon's Gate",
//               },
//               Object {
//                 "title": "Cibola Burn",
//               },
//               Object {
//                 "title": "Nemesis Games",
//               },
//               Object {
//                 "title": "Babylon's Ashes",
//               },
//               Object {
//                 "title": "Persepolis Rising",
//               },
//             ],
//             "name": "James S. A. Corey",
//           },
//           "title": "Cibola Burn",
//         },
//         Object {
//           "author": Object {
//             "books": Array [
//               Object {
//                 "title": "Leviathan Wakes",
//               },
//               Object {
//                 "title": "Caliban's War",
//               },
//               Object {
//                 "title": "Abaddon's Gate",
//               },
//               Object {
//                 "title": "Cibola Burn",
//               },
//               Object {
//                 "title": "Nemesis Games",
//               },
//               Object {
//                 "title": "Babylon's Ashes",
//               },
//               Object {
//                 "title": "Persepolis Rising",
//               },
//             ],
//             "name": "James S. A. Corey",
//           },
//           "title": "Nemesis Games",
//         },
//         Object {
//           "author": Object {
//             "books": Array [
//               Object {
//                 "title": "Leviathan Wakes",
//               },
//               Object {
//                 "title": "Caliban's War",
//               },
//               Object {
//                 "title": "Abaddon's Gate",
//               },
//               Object {
//                 "title": "Cibola Burn",
//               },
//               Object {
//                 "title": "Nemesis Games",
//               },
//               Object {
//                 "title": "Babylon's Ashes",
//               },
//               Object {
//                 "title": "Persepolis Rising",
//               },
//             ],
//             "name": "James S. A. Corey",
//           },
//           "title": "Babylon's Ashes",
//         },
//         Object {
//           "author": Object {
//             "books": Array [
//               Object {
//                 "title": "Leviathan Wakes",
//               },
//               Object {
//                 "title": "Caliban's War",
//               },
//               Object {
//                 "title": "Abaddon's Gate",
//               },
//               Object {
//                 "title": "Cibola Burn",
//               },
//               Object {
//                 "title": "Nemesis Games",
//               },
//               Object {
//                 "title": "Babylon's Ashes",
//               },
//               Object {
//                 "title": "Persepolis Rising",
//               },
//             ],
//             "name": "James S. A. Corey",
//           },
//           "title": "Persepolis Rising",
//         },
//         Object {
//           "author": Object {
//             "books": Array [
//               Object {
//                 "title": "Tiamat's Wrath",
//               },
//               Object {
//                 "title": "Blood of Elves",
//               },
//               Object {
//                 "title": "Time of contempt",
//               },
//               Object {
//                 "title": "Baptism of fire",
//               },
//               Object {
//                 "title": "The tower of the swallow",
//               },
//               Object {
//                 "title": "The lady of the lake",
//               },
//             ],
//             "name": "Andrzej Sapkowski",
//           },
//           "title": "Tiamat's Wrath",
//         },
//         Object {
//           "author": Object {
//             "books": Array [
//               Object {
//                 "title": "Tiamat's Wrath",
//               },
//               Object {
//                 "title": "Blood of Elves",
//               },
//               Object {
//                 "title": "Time of contempt",
//               },
//               Object {
//                 "title": "Baptism of fire",
//               },
//               Object {
//                 "title": "The tower of the swallow",
//               },
//               Object {
//                 "title": "The lady of the lake",
//               },
//             ],
//             "name": "Andrzej Sapkowski",
//           },
//           "title": "Blood of Elves",
//         },
//         Object {
//           "author": Object {
//             "books": Array [
//               Object {
//                 "title": "Tiamat's Wrath",
//               },
//               Object {
//                 "title": "Blood of Elves",
//               },
//               Object {
//                 "title": "Time of contempt",
//               },
//               Object {
//                 "title": "Baptism of fire",
//               },
//               Object {
//                 "title": "The tower of the swallow",
//               },
//               Object {
//                 "title": "The lady of the lake",
//               },
//             ],
//             "name": "Andrzej Sapkowski",
//           },
//           "title": "Time of contempt",
//         },
//         Object {
//           "author": Object {
//             "books": Array [
//               Object {
//                 "title": "Tiamat's Wrath",
//               },
//               Object {
//                 "title": "Blood of Elves",
//               },
//               Object {
//                 "title": "Time of contempt",
//               },
//               Object {
//                 "title": "Baptism of fire",
//               },
//               Object {
//                 "title": "The tower of the swallow",
//               },
//               Object {
//                 "title": "The lady of the lake",
//               },
//             ],
//             "name": "Andrzej Sapkowski",
//           },
//           "title": "Baptism of fire",
//         },
//         Object {
//           "author": Object {
//             "books": Array [
//               Object {
//                 "title": "Tiamat's Wrath",
//               },
//               Object {
//                 "title": "Blood of Elves",
//               },
//               Object {
//                 "title": "Time of contempt",
//               },
//               Object {
//                 "title": "Baptism of fire",
//               },
//               Object {
//                 "title": "The tower of the swallow",
//               },
//               Object {
//                 "title": "The lady of the lake",
//               },
//             ],
//             "name": "Andrzej Sapkowski",
//           },
//           "title": "The tower of the swallow",
//         },
//         Object {
//           "author": Object {
//             "books": Array [
//               Object {
//                 "title": "Tiamat's Wrath",
//               },
//               Object {
//                 "title": "Blood of Elves",
//               },
//               Object {
//                 "title": "Time of contempt",
//               },
//               Object {
//                 "title": "Baptism of fire",
//               },
//               Object {
//                 "title": "The tower of the swallow",
//               },
//               Object {
//                 "title": "The lady of the lake",
//               },
//             ],
//             "name": "Andrzej Sapkowski",
//           },
//           "title": "The lady of the lake",
//         },
//       ],
//     }
//   `);
// });
//
// it("fetches a random author", async () => {
//   // Given
//   jest.spyOn(db.authors, "findRandom").mockResolvedValue({
//     id: 1,
//     name: "Szczepan Twardoch",
//     photoPath: "/sczepan.jpg"
//   });
//
//   const { query } = createTestClient(server);
//
//   const RANDOM_AUTHOR_QUERY = gql`
//     query {
//       randomAuthor {
//         name
//         photo {
//           url
//         }
//       }
//     }
//   `;
//
//   // When
//   const res = await query({ query: RANDOM_AUTHOR_QUERY });
//
//   // Then
//   expect(res.data).not.toBeUndefined();
//   expect(res.data!.randomAuthor).toMatchInlineSnapshot(`
//     Object {
//       "name": "Szczepan Twardoch",
//       "photo": Object {
//         "url": "http://examples.devmastery.pl/assets/sczepan.jpg",
//       },
//     }
//   `);
// });
//
// it("fetches a random book", async () => {
//   // Given
//   jest.spyOn(db.books, "findRandom").mockResolvedValue({
//     id: 1,
//     authorId: 1,
//     title: "Król",
//     coverPath: "/krol.jpg"
//   });
//
//   const { query } = createTestClient(server);
//
//   const RANDOM_BOOK_QUERY = gql`
//     query {
//       randomBook {
//         title
//         cover {
//           url
//         }
//       }
//     }
//   `;
//
//   // When
//   const res = await query({ query: RANDOM_BOOK_QUERY });
//
//   // Then
//   expect(res.data).not.toBeUndefined();
//   expect(res.data!.randomBook).toMatchInlineSnapshot(`
//     Object {
//       "cover": Object {
//         "url": "http://examples.devmastery.pl/assets/krol.jpg",
//       },
//       "title": "Król",
//     }
//   `);
// });
//
// it("fetches users", async () => {
//   const { query } = createTestClient(server);
//
//   const USERS_QUERY = gql`
//     query {
//       users {
//         name
//         email
//         avatar {
//           color
//           image {
//             url
//           }
//         }
//       }
//     }
//   `;
//
//   // When
//   const res = await query({ query: USERS_QUERY });
//
//   // Then
//   expect(res.data).not.toBeUndefined();
//   expect(res.data!.users).toMatchInlineSnapshot(`
//     Array [
//       Object {
//         "avatar": Object {
//           "color": "yellow",
//           "image": Object {
//             "url": "http://examples.devmastery.pl/assets/images/avatars/w13.png",
//           },
//         },
//         "email": "alice@example.com",
//         "name": "Alice",
//       },
//       Object {
//         "avatar": Object {
//           "color": "green",
//           "image": Object {
//             "url": "http://examples.devmastery.pl/assets/images/avatars/m10.png",
//           },
//         },
//         "email": "bob@example.com",
//         "name": "Bob",
//       },
//       Object {
//         "avatar": Object {
//           "color": "red",
//           "image": Object {
//             "url": "http://examples.devmastery.pl/assets/images/avatars/w2.png",
//           },
//         },
//         "email": "celine@example.com",
//         "name": "Celine",
//       },
//       Object {
//         "avatar": Object {
//           "color": "blue",
//           "image": Object {
//             "url": "http://examples.devmastery.pl/assets/images/avatars/m25.png",
//           },
//         },
//         "email": "dan@example.com",
//         "name": "Dan",
//       },
//     ]
//   `);
// });
