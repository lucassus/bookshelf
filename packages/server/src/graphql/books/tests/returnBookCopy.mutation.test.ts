import { gql } from "apollo-server-express";
import { getManager } from "typeorm";

import { secureId } from "../../../common/secureId";
import { BookCopy } from "../../../database/entity/BookCopy";
import {
  createBook,
  createBookCopy,
  createUser
} from "../../../testUtils/factories";
import { createTestClient } from "../../../testUtils/hepers";

test("returnBookCopy mutation", async () => {
  // Given
  const currentUser = await createUser({ name: "Bob" });

  const book = await createBook();
  const owner = await createUser({ name: "Alice" });
  let bookCopy = await createBookCopy({ book, owner, borrower: currentUser });

  // When
  const id = secureId.toExternal(bookCopy.id, "BookCopy");

  const res = await createTestClient({ currentUser }).mutate({
    mutation: gql`
      mutation($id: ExternalID!) {
        returnBookCopy(id: $id) {
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
    `,
    variables: { id }
  });

  // Then
  bookCopy = await getManager().findOneOrFail(BookCopy, bookCopy.id);
  expect(bookCopy.borrowerId).toBe(null);

  expect(res.errors).toBe(undefined);
  expect(res.data).not.toBe(null);
  expect(res.data).toMatchObject({
    returnBookCopy: {
      id,
      book: {
        id: expect.any(String),
        title: book.title
      },
      owner: {
        id: expect.any(String),
        name: owner.name
      }
    }
  });
});
