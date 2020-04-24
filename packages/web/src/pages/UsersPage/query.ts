import { gql } from "@apollo/client";

export const GetUsers = gql`
  query GetUsers {
    users {
      id
      name
      avatar {
        image {
          url
        }
        color
      }
    }
  }
`;
