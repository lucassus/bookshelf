import { gql } from "apollo-server";

export const typeDefs = gql`
  schema {
    query: Query
  }

  type Query {
    message: String!
  }
`;
