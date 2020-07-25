import { gql } from "apollo-server-express";
import { getConnection } from "typeorm";

import { User } from "../../database/entity/User";
import { secureId } from "../../database/helpers";
import { createUser } from "../factories";
import { createTestClient } from "../hepers";

describe("deleteUser mutation", () => {
  let user: User;

  beforeEach(async () => {
    user = await createUser();
  });

  const DeleteUserMutation = gql`
    mutation($id: ExternalID!) {
      deleteUser(id: $id)
    }
  `;

  it("deletes a user when authenticated as admin", async () => {
    // Given
    const currentUser = await createUser({ isAdmin: true });

    // When
    const res = await createTestClient({ currentUser }).mutate({
      mutation: DeleteUserMutation,
      variables: { id: secureId.toExternal(user.id, "User") }
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).not.toBe(null);
    expect(res.data).toEqual({
      deleteUser: secureId.toExternal(user.id, "User")
    });

    await expect(
      getConnection().manager.findOne(User, { id: user.id })
    ).resolves.toBe(undefined);
  });

  it("returns an error when authenticates as a regular user", async () => {
    // Given
    const currentUser = await createUser({ isAdmin: false });

    // When
    const res = await createTestClient({ currentUser }).mutate({
      mutation: DeleteUserMutation,
      variables: { id: secureId.toExternal(user.id, "User") }
    });

    // Then
    expect(res.errors).not.toBe(undefined);
  });

  it("returns an error when not authenticates", async () => {
    // When
    const res = await createTestClient().mutate({
      mutation: DeleteUserMutation,
      variables: { id: secureId.toExternal(user.id, "User") }
    });

    // Then
    expect(res.errors).not.toBe(undefined);
  });
});
