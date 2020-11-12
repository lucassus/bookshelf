import { gql } from "apollo-server-express";
import httpMocks from "node-mocks-http";

import { AUTH_COOKIE_NAME } from "../../../infra/config";
import { createTestClient } from "../../../infra/testing/createTestClient";

test("logout mutation", async () => {
  // Given
  const expressRes = httpMocks.createResponse();
  expressRes.cookie(AUTH_COOKIE_NAME, "the fake token");

  // When
  const res = await createTestClient({ res: expressRes }).mutate({
    mutation: gql`
      mutation {
        logout
      }
    `
  });

  // Then
  expect(res.errors).toBe(undefined);
  expect(res.data).toMatchObject({
    logout: true
  });

  expect(expressRes.cookies[AUTH_COOKIE_NAME]).toMatchObject({
    value: "",
    options: { expires: expect.any(Date), path: "/" }
  });
});
