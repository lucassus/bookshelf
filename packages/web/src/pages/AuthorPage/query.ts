import { gql } from "@apollo/client";

export const GetAuthor = gql`
  query GetAuthor($id: Int!) {
    author(id: $id) {
      name
      books {
        id
        title
        cover {
          url
        }
      }
    }
  }
`;
