import { gql } from "apollo-server-express";
import { getConnection } from "typeorm";

import { secureId } from "../../../common/secureId";
import { User } from "../../../database/entity/User";
import { createUser } from "../../../testUtils/factories";
import { createTestClient } from "../../../testUtils/hepers";

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

  it("returns an error when authenticated as a regular user", async () => {
    // Given
    const currentUser = await createUser({ isAdmin: false });

    // When
    const res = await createTestClient({ currentUser }).mutate({
      mutation: DeleteUserMutation,
      variables: { id: secureId.toExternal(user.id, "User") }
    });

    // Then
    expect(res.errors).not.toBe(undefined);

    const error = res.errors![0];
    expect(error.message).toBe("Unauthorized access! Please log in as admin.");
    expect(error.extensions!.code).toBe("FORBIDDEN");
  });

  it("returns an error when not authenticated", async () => {
    // When
    const res = await createTestClient().mutate({
      mutation: DeleteUserMutation,
      variables: { id: secureId.toExternal(user.id, "User") }
    });

    // Then
    expect(res.errors).not.toBe(undefined);

    const error = res.errors![0];
    expect(error.message).toBe("Unauthorized access! Please log in.");
    expect(error.extensions!.code).toBe("UNAUTHENTICATED");
  });
});
