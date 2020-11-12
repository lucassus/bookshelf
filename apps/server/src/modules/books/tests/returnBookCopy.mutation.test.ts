import { gql } from "apollo-server-express";
import { getManager } from "typeorm";

import { toExternalId } from "../../../common/secureId";
import { BookCopy } from "../../../infra/database/entity";
import { createTestClient } from "../../../testUtils/createTestClient";
import {
  createBook,
  createBookCopy,
  createUser
} from "../../../testUtils/factories";

describe("returnBookCopy mutation", () => {
  const ReturnBookCopyMutation = gql`
    mutation($id: ExternalID!) {
      returnBookCopy(id: $id) {
        __typename

        ... on BookCopy {
          id
          book {
            id
            title
          }
          owner {
            ...User
          }
          borrower {
            ...User
          }
          borrowedAt
        }

        ... on MutationError {
          message
        }
      }
    }

    fragment User on User {
      id
      name
    }
  `;

  test("on success", async () => {
    // Given
    const currentUser = await createUser({ name: "Bob" });

    const book = await createBook();
    const owner = await createUser({ name: "Alice" });
    let bookCopy = await createBookCopy({ book, owner, borrower: currentUser });

    // When
    const res = await createTestClient({ currentUser }).mutate({
      mutation: ReturnBookCopyMutation,
      variables: { id: toExternalId(bookCopy) }
    });

    // Then
    bookCopy = await getManager().findOneOrFail(BookCopy, bookCopy.id);
    expect(bookCopy.borrowerId).toBe(null);

    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchObject({
      returnBookCopy: {
        __typename: "BookCopy",
        id: toExternalId(bookCopy),
        book: {
          id: expect.any(String),
          title: book.title
        },
        owner: {
          id: expect.any(String),
          name: owner.name
        },
        borrowedAt: null
      }
    });
  });

  test("on error", async () => {
    // Given
    const currentUser = await createUser({ name: "Bob" });

    const owner = await createUser({ name: "Alice" });
    const borrower = await createUser({ name: "Dan" });
    const bookCopy = await createBookCopy({ owner, borrower });

    // When
    const res = await createTestClient({ currentUser }).mutate({
      mutation: ReturnBookCopyMutation,
      variables: { id: toExternalId(bookCopy) }
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchObject({
      returnBookCopy: {
        __typename: "MutationError",
        message: "Could not find borrowed book copy to return!"
      }
    });
  });
});
