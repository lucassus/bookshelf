import { gql } from "@apollo/client";

export const GetBooks = gql`
  query GetBooks {
    books {
      id
      title
      cover {
        url
      }
      author {
        name
      }
    }
  }
`;
