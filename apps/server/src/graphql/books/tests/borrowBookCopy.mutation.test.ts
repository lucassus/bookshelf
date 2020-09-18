import { gql } from "apollo-server-express";
import { getManager } from "typeorm";

import { toExternalId } from "../../../common/secureId";
import { BookCopy } from "../../../database/entity";
import { createTestClient } from "../../../testUtils/createTestClient";
import {
  createBook,
  createBookCopy,
  createUser
} from "../../../testUtils/factories";

test("borrowBookCopy mutation", async () => {
  // Given
  const currentUser = await createUser({ name: "Bob" });

  const book = await createBook({ title: "Time of contempt" });
  const owner = await createUser({ name: "Alice" });
  let bookCopy = await createBookCopy({ book, owner });

  // When
  const res = await createTestClient({ currentUser }).mutate({
    mutation: gql`
      mutation($id: ExternalID!) {
        borrowBookCopy(id: $id) {
          success
          message
          bookCopy {
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
          }
        }
      }
    `,
    variables: { id: toExternalId(bookCopy) }
  });

  // Then
  bookCopy = await getManager().findOneOrFail(BookCopy, bookCopy.id);
  expect(bookCopy.borrowerId).toBe(currentUser.id);

  expect(res.errors).toBe(undefined);
  expect(res.data).not.toBe(null);
  expect(res.data).toMatchObject({
    borrowBookCopy: {
      success: true,
      message: "Book was successfully borrowed.",
      bookCopy: {
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
        }
      }
    }
  });
});
