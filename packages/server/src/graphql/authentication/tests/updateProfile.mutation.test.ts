import { gql } from "apollo-server-express";

import { createTestClient } from "../../../testUtils/createTestClient";
import { createUser } from "../../../testUtils/factories";

test("updateProfile mutation", async () => {
  // Given
  const currentUser = await createUser();

  const mutation = gql`
    mutation($input: UpdateProfileInput!) {
      updateProfile(input: $input) {
        __typename

        ... on UpdateProfileSuccess {
          currentUser {
            name
            email
            info
          }
        }
      }
    }
  `;

  // When
  const res = await createTestClient({ currentUser }).mutate({
    mutation,
    variables: {
      input: {
        email: "anna@example.com",
        name: "Anna",
        info: "Foo bar"
      }
    }
  });

  // Then
  expect(res.errors).toBe(undefined);
  expect(res.data).toMatchObject({
    updateProfile: {
      __typename: "UpdateProfileSuccess",
      currentUser: {
        name: "Anna",
        email: "anna@example.com",
        info: "Foo bar"
      }
    }
  });
});
