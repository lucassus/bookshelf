import { render, waitForElementToBeRemoved } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router";

import { ApolloMockedProvider } from "../../testUtils/ApolloMockedProvider";
import { AuthorsPage } from "./AuthorsPage";

// TODO: Refactor with graphql mock
// export const GetAuthorsDocumentMock: MockedResponse<{
//   authors: Author[];
// }> = {
//   request: {
//     query: GetAuthorsDocument
//   },
//   result: {
//     data: {
//       authors: [
//         {
//           __typename: "Author",
//           ...createAuthor({ id: "1", name: "J. K. Rowling" })
//         },
//         {
//           __typename: "Author",
//           ...createAuthor({ id: "2", name: "Andrzej Sapkowski" })
//         }
//       ]
//     }
//   }
// };
//
// export const GetAuthorsDocumentErrorMock: MockedResponse = {
//   request: {
//     query: GetAuthorsDocument
//   },
//   error: new Error()
// };

describe("<AuthorsPage />", () => {
  const renderComponent = () =>
    render(
      <ApolloMockedProvider>
        <MemoryRouter>
          <AuthorsPage />
        </MemoryRouter>
      </ApolloMockedProvider>
    );
  // const renderComponent = ({ mocks }: { mocks: MockedResponse[] }) =>
  //   render(
  //     <MockedProvider mocks={mocks}>
  //       <MemoryRouter>
  //         <AuthorsPage />
  //       </MemoryRouter>
  //     </MockedProvider>
  //   );

  it("renders list of authors", async () => {
    // When
    const { getByText } = renderComponent();

    // Then
    expect(getByText("Loading authors...")).toBeInTheDocument();
    await waitForElementToBeRemoved(() => getByText("Loading authors..."));

    expect(getByText("J. K. Rowling")).toBeInTheDocument();
    expect(getByText("Andrzej Sapkowski")).toBeInTheDocument();
  });

  // xit("renders error alert when request fails", async () => {
  //   // When
  //   const { getByText } = renderComponent({
  //     mocks: [GetAuthorsDocumentErrorMock]
  //   });
  //
  //   // Then
  //   await waitForElementToBeRemoved(() => getByText("Loading authors..."));
  //   expect(getByText("Could not load authors...")).toBeInTheDocument();
  // });
});
