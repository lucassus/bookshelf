import { gql } from "apollo-server-express";
import httpMocks from "node-mocks-http";

import { AUTH_COOKIE_NAME } from "../../../config";
import { createTestClient } from "../../../testUtils/createTestClient";

test("logout mutation", async () => {
  // Given
  const expressRes = httpMocks.createResponse();
  expressRes.cookie(AUTH_COOKIE_NAME, "the fake token");

  // When
  const res = await createTestClient({ res: expressRes }).mutate({
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

  expect(expressRes.cookies[AUTH_COOKIE_NAME]).toMatchObject({
    value: "",
    options: { expires: expect.any(Date), path: "/" }
  });
});
