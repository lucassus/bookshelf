import { InMemoryCache } from "@apollo/client";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";

import { CurrentUserContext } from "../../CurrentUserProvider";
import { CurrentUserFragment } from "../../CurrentUserProvider/CurrentUser.fragment.generated";
import { BookCopyFragment } from "../BookCopy.fragment.generated";
import { ReturnBookCopyDocument } from "./ReturnBookCopy.mutation.generated";
import { ReturnButton } from "./ReturnButton";

test("<ReturnButton />", async () => {
  // Given
  const mocks: MockedResponse[] = [
    {
      request: {
        query: ReturnBookCopyDocument,
        variables: { id: "bookCopy:1" }
      },
      result: {
        data: {
          __typename: "Mutation",
          returnBookCopy: {
            id: "bookCopy:1",
            __typename: "BookCopy"
          }
        }
      }
    }
  ];

  const currentUser: CurrentUserFragment = {
    id: "user:1",
    __typename: "ProtectedUser",
    name: "Bob",
    email: "bob@example.com",
    isAdmin: false,
    info: "The current user",
    avatar: {
      __typename: "Avatar",
      color: "blue",
      image: {
        url: "https://example.com/image.jpg"
      }
    }
  };

  const bookCopy: BookCopyFragment = {
    id: "bookCopy:1",
    __typename: "BookCopy",
    book: {
      id: "book:1",
      __typename: "Book",
      title: "Dune",
      cover: {
        __typename: "Image",
        url: "https://example.com/image.jpg"
      }
    },
    owner: {
      id: "user:2",
      __typename: "PublicUser",
      name: "Luke",
      avatar: {
        __typename: "Avatar",
        color: "blue",
        image: {
          url: "https://example.com/image.jpg"
        }
      }
    },
    borrower: {
      id: "user:1",
      __typename: "PublicUser",
      name: "Bob",
      avatar: {
        __typename: "Avatar",
        color: "blue",
        image: {
          url: "https://example.com/image.jpg"
        }
      }
    }
  };

  const cache = new InMemoryCache().restore({
    "ProtectedUser:user:1": {
      id: "user:1",
      __typename: "ProtectedUser",
      borrowedBookCopies: [{ __ref: "BookCopy:bookCopy:1" }]
    }
  });

  render(
    <MockedProvider cache={cache} mocks={mocks}>
      <CurrentUserContext.Provider value={currentUser}>
        {" "}
        <ReturnButton bookCopy={bookCopy} />
      </CurrentUserContext.Provider>
    </MockedProvider>
  );

  // When
  fireEvent.click(screen.getByText("return"));
  expect(screen.getByText("return")).toHaveAttribute("disabled");
  await waitFor(() =>
    expect(screen.getByText("return")).not.toHaveAttribute("disabled")
  );

  // Then
  const updatedCache = cache.extract();
  expect(updatedCache["ProtectedUser:user:1"]!.borrowedBookCopies).toEqual([]);
});
