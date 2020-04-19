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
  expect(res.data.authors).toEqual([
    {
      books: [
        { title: "Harry Potter and the Sorcerer's Stone" },
        { title: "Harry Potter and the Chamber of Secrets" },
        { title: "Harry Potter and the Prisoner of Azkaban" },
        { title: "Harry Potter and the Goblet of Fire" },
        { title: "Harry Potter and the Order of the Phoenix" },
        { title: "Harry Potter and the Half-Blood Prince" },
        { title: "Harry Potter and the Deathly Hallows" },
      ],
      name: "J. K. Rowling",
    },
    {
      books: [
        { title: "Leviathan Wakes" },
        { title: "Caliban's War" },
        { title: "Abaddon's Gate" },
        { title: "Cibola Burn" },
        { title: "Nemesis Games" },
        { title: "Babylon's Ashes" },
        { title: "Persepolis Rising" },
      ],
      name: "James S. A. Corey",
    },
    {
      books: [
        { title: "Tiamat's Wrath" },
        { title: "Blood of Elves" },
        { title: "Time of contempt" },
        { title: "Baptism of fire" },
        { title: "The tower of the swallow" },
        { title: "The lady of the lake" },
      ],
      name: "Andrzej Sapkowski",
    },
  ]);
});

it("fetches books along with authors", async () => {
  // Given
  const { query } = createTestClient(server);

  const BOOKS_QUERY = gql`
    query {
      books {
        title
        author {
          name
        }
      }
    }
  `;

  // When
  const res = await query({ query: BOOKS_QUERY });

  // Then
  expect(res.data).not.toBeUndefined();
  expect(res.data.books).toEqual([
    {
      title: "Harry Potter and the Sorcerer's Stone",
      author: {
        name: "J. K. Rowling",
      },
    },
    {
      title: "Harry Potter and the Chamber of Secrets",
      author: {
        name: "J. K. Rowling",
      },
    },
    {
      title: "Harry Potter and the Prisoner of Azkaban",
      author: {
        name: "J. K. Rowling",
      },
    },
    {
      title: "Harry Potter and the Goblet of Fire",
      author: {
        name: "J. K. Rowling",
      },
    },
    {
      title: "Harry Potter and the Order of the Phoenix",
      author: {
        name: "J. K. Rowling",
      },
    },
    {
      title: "Harry Potter and the Half-Blood Prince",
      author: {
        name: "J. K. Rowling",
      },
    },
    {
      title: "Harry Potter and the Deathly Hallows",
      author: {
        name: "J. K. Rowling",
      },
    },
    {
      title: "Leviathan Wakes",
      author: {
        name: "James S. A. Corey",
      },
    },
    {
      title: "Caliban's War",
      author: {
        name: "James S. A. Corey",
      },
    },
    {
      title: "Abaddon's Gate",
      author: {
        name: "James S. A. Corey",
      },
    },
    {
      title: "Cibola Burn",
      author: {
        name: "James S. A. Corey",
      },
    },
    {
      title: "Nemesis Games",
      author: {
        name: "James S. A. Corey",
      },
    },
    {
      title: "Babylon's Ashes",
      author: {
        name: "James S. A. Corey",
      },
    },
    {
      title: "Persepolis Rising",
      author: {
        name: "James S. A. Corey",
      },
    },
    {
      title: "Tiamat's Wrath",
      author: {
        name: "Andrzej Sapkowski",
      },
    },
    {
      title: "Blood of Elves",
      author: {
        name: "Andrzej Sapkowski",
      },
    },
    {
      title: "Time of contempt",
      author: {
        name: "Andrzej Sapkowski",
      },
    },
    {
      title: "Baptism of fire",
      author: {
        name: "Andrzej Sapkowski",
      },
    },
    {
      title: "The tower of the swallow",
      author: {
        name: "Andrzej Sapkowski",
      },
    },
    {
      title: "The lady of the lake",
      author: {
        name: "Andrzej Sapkowski",
      },
    },
  ]);
});
