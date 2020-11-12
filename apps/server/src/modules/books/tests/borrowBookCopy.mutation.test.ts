import { gql } from "apollo-server-express";
import { getManager } from "typeorm";

import { toExternalId } from "../../../common/secureId";
import { BookCopy } from "../../../infra/database/entity";
import {
  createBook,
  createBookCopy,
  createUser
} from "../../../infra/factories";
import { createTestClient } from "../../../testUtils/createTestClient";

describe("borrowBookCopy mutation", () => {
  const BorrowBookCopyMutation = gql`
    mutation($id: ExternalID!) {
      borrowBookCopy(id: $id) {
        __typename

        ... on BookCopy {
          id
          book {
            id
            title
          }
          owner {
            id
            name
          }
          borrower {
            id
            name
          }
          borrowedAt
        }

        ... on MutationError {
          message
        }
      }
    }
  `;

  test("on success", async () => {
    // Given
    const currentUser = await createUser({ name: "Bob" });

    const book = await createBook({ title: "Time of contempt" });
    const owner = await createUser({ name: "Alice" });
    let bookCopy = await createBookCopy({ book, owner });

    // When
    const res = await createTestClient({ currentUser }).mutate({
      mutation: BorrowBookCopyMutation,
      variables: { id: toExternalId(bookCopy) }
    });

    // Then
    bookCopy = await getManager().findOneOrFail(BookCopy, bookCopy.id);
    expect(bookCopy.borrowerId).toBe(currentUser.id);

    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchObject({
      borrowBookCopy: {
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
        borrower: {
          id: expect.any(String),
          name: currentUser.name
        },
        borrowedAt: expect.any(String)
      }
    });
  });

  test("on error", async () => {
    // Given
    const currentUser = await createUser({ name: "Bob" });
    const owner = await createUser({ name: "Alice" });
    const bookCopy = await createBookCopy({ owner, borrower: currentUser });

    // When
    const res = await createTestClient({ currentUser }).mutate({
      mutation: BorrowBookCopyMutation,
      variables: { id: toExternalId(bookCopy) }
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchObject({
      borrowBookCopy: {
        __typename: "MutationError",
        message: "Cannot borrow this book copy. It is already borrowed."
      }
    });
  });
});
