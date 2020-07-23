import { gql } from "apollo-server-express";
import { getManager } from "typeorm";

import { BookCopy } from "../../database/entity/BookCopy";
import { secureId } from "../../database/helpers";
import { createBook, createBookCopy, createUser } from "../factories";
import { getTestClient } from "../hepers";

test("borrowBookCopy mutation", async () => {
  // Given
  const currentUser = await createUser({ name: "Bob" });

  const book = await createBook({ title: "Time of contempt" });
  const owner = await createUser({ name: "Alice", email: "alice@email.com" });
  let bookCopy = await createBookCopy({
    bookId: book.id,
    ownerId: owner.id
  });

  // When
  const res = await getTestClient({ currentUser }).mutate({
    mutation: gql`
      mutation($id: ExternalID!) {
        borrowBookCopy(id: $id) {
          id
          book {
            id
            title
          }
          owner {
            id
            name
            email
          }
          borrower {
            id
            name
            email
          }
        }
      }
    `,
    variables: { id: secureId.toExternal(bookCopy.id, "BookCopy") }
  });

  // Then
  bookCopy = await getManager().findOneOrFail(BookCopy, bookCopy.id);
  expect(bookCopy.borrowerId).toBe(currentUser.id);

  expect(res.errors).toBe(undefined);
  expect(res.data).not.toBe(null);
  expect(res.data).toMatchObject({
    borrowBookCopy: {
      id: secureId.toExternal(bookCopy.id, "BookCopy"),
      book: {
        id: expect.any(String),
        title: book.title
      },
      owner: {
        id: expect.any(String),
        name: owner.name,
        email: owner.email
      },
      borrower: {
        id: expect.any(String),
        name: currentUser.name,
        email: currentUser.email
      }
    }
  });
});
