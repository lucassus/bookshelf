import { gql } from "apollo-server-express";

export const typeDefs = gql`
  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    authors: [Author!]!
    author(id: Int!): Author!

    booksCount: Int!
    books(offset: Int = 0, limit: Int = 9): [Book!]!
    book(id: Int!): Book!
    randomBook: Book!

    users: [User!]!
  }

  type Mutation {
    updateBookFavourite(id: Int!, favourite: Boolean): Book!
  }

  type Author {
    id: Int!
    name: String!
    bio: String!
    photo: Image
    books: [Book!]
  }

  type Book {
    id: Int!
    title: String!
    description: String!
    cover: Image!
    favourite: Boolean!
    author: Author
  }

  type User {
    id: Int!
    name: String!
    info: String!
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
