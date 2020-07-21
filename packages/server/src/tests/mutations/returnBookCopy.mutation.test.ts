import { gql } from "apollo-server-express";
import { getManager } from "typeorm";

import { BookCopy } from "../../database/entity/BookCopy";
import { User } from "../../database/entity/User";
import { secureId } from "../../database/helpers";
import { createBook, createBookCopy, createUser } from "../factories";
import { getTestClient } from "../hepers";

let currentUser: User;

beforeEach(async () => {
  currentUser = await createUser({ name: "Bob" });
});

test("returnBookCopy mutation", async () => {
  // Given
  const book = await createBook();
  const owner = await createUser({ name: "Alice", email: "alice@email.com" });
  let bookCopy = await createBookCopy({
    bookId: book.id,
    ownerId: owner.id,
    borrowerId: currentUser.id
  });

  // When
  const id = secureId.toExternal(bookCopy.id, "BookCopy");

  const res = await getTestClient().mutate({
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
            email
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
        name: owner.name,
        email: owner.email
      }
    }
  });
});
