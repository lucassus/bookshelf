import { gql } from "apollo-server-express";

import { createTestClient } from "../../../testUtils/createTestClient";

test("logout mutation", async () => {
  // When
  const res = await createTestClient().mutate({
    mutation: gql`
      mutation {
        logout {
          success
          message
        }
      }
    `
  });

  // Then
  expect(res.errors).toBe(undefined);
  expect(res.data).toMatchObject({
    logout: {
      success: true,
      message: "Logout success!"
    }
  });
});
