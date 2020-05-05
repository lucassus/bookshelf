import { gql } from "apollo-server-express";

// TODO: Figure out why I cannot use `bio: String!` etc.
export const typeDefs = gql`
  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    authors: [Author!]!
    author(id: ID!): Author!

    booksCount: Int!
    books(offset: Int = 0, limit: Int = 9): [Book!]!
    book(id: ID!): Book!
    randomBook: Book!

    users: [User!]!
    user(id: ID!): User!
  }

  type Mutation {
    updateBookFavourite(id: ID!, favourite: Boolean): Book!
  }

  type Author {
    id: ID!
    name: String!
    bio: String
    photo: Image
    books: [Book!]
  }

  type Book {
    id: ID!
    title: String!
    description: String
    cover: Image!
    favourite: Boolean!
    author: Author
  }

  type User {
    id: ID!
    name: String!
    info: String
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
