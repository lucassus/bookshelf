import { gql } from "apollo-server-express";
import { getConnection } from "typeorm";

import { User } from "../../database/entity/User";
import { secureId } from "../../database/helpers";
import { createUser } from "../factories";
import { getTestClient } from "../hepers";

test("deleteUser mutation", async () => {
  // Given
  const user = await createUser();
  const id = secureId.toExternal(user.id, "User");

  // When
  const res = await getTestClient().mutate({
    mutation: gql`
      mutation($id: ExternalID!) {
        deleteUser(id: $id)
      }
    `,
    variables: { id }
  });

  // Then
  expect(res.errors).toBe(undefined);
  expect(res.data).not.toBe(null);
  expect(res.data).toEqual({ deleteUser: id });

  await expect(
    getConnection().manager.findOne(User, { id: user.id })
  ).resolves.toBe(undefined);
});
