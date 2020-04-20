import { gql } from "apollo-server";

export const typeDefs = gql`
  schema {
    query: Query
  }

  type Query {
    message: String!

    authors: [Author!]!
    randomAuthor: Author!
      
    books: [Book!]!
    users: [User!]!
  }

  type Author {
    name: String!
    photo: Image!
    books: [Book]
  }

  type Book {
    title: String!
    cover: Image!
    author: Author
  }

  type User {
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
