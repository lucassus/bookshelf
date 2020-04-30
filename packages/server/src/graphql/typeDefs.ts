import { gql } from "apollo-server-express";

export const typeDefs = gql`
  schema {
    query: Query
  }

  type Query {
    authors: [Author!]!
    author(id: Int!): Author

    books(limit: Int = 9, offset: Int = 0): PaginatedBooks
    randomBook: Book!

    users: [User!]!
  }

  type PaginatedBooks {
    rows: [Book!]!
    total: Int!
  }

  type Author {
    id: Int!
    name: String!
    photo: Image!
    books: [Book!]!
  }

  type Book {
    id: Int!
    title: String!
    cover: Image!
    author: Author!
  }

  type User {
    id: Int!
    name: String!
    email: String!
    avatar: Avatar!
  }

  type Image {
    url: String!
  }

  type Avatar {
    image: Image!
    color: String!
  }
`;
