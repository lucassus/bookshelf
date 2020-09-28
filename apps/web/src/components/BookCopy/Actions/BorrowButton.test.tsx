import { InMemoryCache } from "@apollo/client";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";

import { AuthContext, AuthContextValue } from "../../AuthContext/AuthContext";
import { BookCopyFragment } from "../BookCopy.fragment.generated";
import { BorrowBookCopyDocument } from "./BorrowBookCopy.mutation.generated";
import { BorrowButton } from "./BorrowButton";

test("<BorrowButton />", async () => {
  // Given
  const mocks: MockedResponse[] = [
    {
      request: {
        query: BorrowBookCopyDocument,
        variables: { id: "bookCopy:1" }
      },
      result: {
        data: {
          __typename: "Mutation",
          borrowBookCopy: {
            id: "bookCopy:1",
            __typename: "BookCopy"
          }
        }
      }
    }
  ];

  const value: AuthContextValue = {
    authorize: () => {},
    currentUser: {
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
    },
    unauthorize: () => Promise.resolve()
  };

  const bookCopy: BookCopyFragment = {
    id: "bookCopy:1",
    __typename: "BookCopy",
    book: {
      id: "book:!",
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
    }
  };

  const cache = new InMemoryCache().restore({
    "ProtectedUser:user:1": {
      id: "user:1",
      __typename: "ProtectedUser",
      borrowedBookCopies: []
    }
  });

  render(
    <MockedProvider cache={cache} mocks={mocks}>
      <AuthContext.Provider value={value}>
        {" "}
        <BorrowButton bookCopy={bookCopy} />
      </AuthContext.Provider>
    </MockedProvider>
  );

  // When
  fireEvent.click(screen.getByText("borrow"));
  expect(screen.getByText("borrow")).toHaveAttribute("disabled");
  await waitFor(() =>
    expect(screen.getByText("borrow")).not.toHaveAttribute("disabled")
  );

  // Then
  const updatedCache = cache.extract();
  expect(updatedCache["ProtectedUser:user:1"]!.borrowedBookCopies).toEqual([
    { __ref: "BookCopy:bookCopy:1" }
  ]);
});
