import { gql } from "apollo-server-express";
import { Container } from "typedi";
import { Connection } from "typeorm";

import { toExternalId } from "../../../common/secureId";
import { User } from "../../../infra/database/entity";
import { createTestClient } from "../../../testUtils/createTestClient";
import { createUser } from "../../../testUtils/factories";

describe("deleteUser mutation", () => {
  let user: User;

  beforeEach(async () => {
    user = await createUser();
  });

  const DeleteUserMutation = gql`
    mutation($id: ExternalID!) {
      deleteUser(id: $id) {
        success
        message
      }
    }
  `;

  it("deletes a user when authenticated as admin", async () => {
    // Given
    const currentUser = await createUser({ isAdmin: true });

    // When
    const res = await createTestClient({ currentUser }).mutate({
      mutation: DeleteUserMutation,
      variables: { id: toExternalId(user) }
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).not.toBe(null);
    expect(res.data).toEqual({
      deleteUser: {
        success: true,
        message: "User was successfully deleted."
      }
    });

    await expect(
      Container.get(Connection).manager.findOne(User, { id: user.id })
    ).resolves.toBe(undefined);
  });

  it("returns an error when authenticated as a regular user", async () => {
    // Given
    const currentUser = await createUser({ isAdmin: false });

    // When
    const res = await createTestClient({ currentUser }).mutate({
      mutation: DeleteUserMutation,
      variables: { id: toExternalId(user) }
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
      variables: { id: toExternalId(user) }
    });

    // Then
    expect(res.errors).not.toBe(undefined);

    const error = res.errors![0];
    expect(error.message).toBe("Unauthorized access! Please log in.");
    expect(error.extensions!.code).toBe("UNAUTHENTICATED");
  });
});
