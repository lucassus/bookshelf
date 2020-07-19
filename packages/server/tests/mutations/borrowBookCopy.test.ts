import { gql } from "apollo-server-express";
import { getManager } from "typeorm";

import { BookCopy } from "../../src/database/entity/BookCopy";
import { User } from "../../src/database/entity/User";
import {
  createBook,
  createBookCopy,
  createUser
} from "../../src/database/factories";
import { secureId } from "../../src/database/helpers";
import { getTestClient } from "../../src/testHelpers";

let currentUser: User;

beforeEach(async () => {
  currentUser = await createUser({ name: "Bob" });
});

test("borrowBookCopy mutation", async () => {
  // Given
  const book = await createBook({ title: "Time of contempt" });
  const owner = await createUser({ name: "Alice", email: "alice@email.com" });
  let bookCopy = await createBookCopy({
    bookId: book.id,
    ownerId: owner.id
  });

  // When
  const id = secureId.toExternal(bookCopy.id, "BookCopy");

  const res = await getTestClient().mutate({
    mutation: gql`
      mutation($id: ID!) {
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
    variables: { id }
  });

  // Then
  bookCopy = await getManager().findOneOrFail(BookCopy, bookCopy.id);
  expect(bookCopy.borrowerId).toBe(currentUser.id);

  expect(res.data).not.toBe(null);
  expect(res.data).toMatchObject({
    borrowBookCopy: {
      id,
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
