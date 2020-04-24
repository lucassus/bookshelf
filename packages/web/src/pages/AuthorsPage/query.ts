import { gql } from "@apollo/client";

export const GetAuthors = gql`
  query GetAuthors {
    authors {
      id
      name
      photo {
        url
      }
    }
  }
`;
