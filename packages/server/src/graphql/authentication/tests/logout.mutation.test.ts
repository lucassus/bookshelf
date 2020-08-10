import { gql } from "apollo-server-express";
import httpMocks from "node-mocks-http";

import { createTestClient } from "../../../testUtils/createTestClient";

test("logout mutation", async () => {
  // Given
  const expressRes = httpMocks.createResponse();
  expressRes.cookie("jid", "the fake token");

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

  expect(expressRes.cookies.jid).toMatchObject({
    value: "",
    options: { expires: expect.any(Date), path: "/" }
  });
});
