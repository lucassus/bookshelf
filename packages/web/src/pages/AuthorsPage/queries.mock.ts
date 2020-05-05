import { MockedResponse } from "@apollo/client/testing";

import { createAuthor } from "../../testUtils/factories";
import { GetAuthorsDocument } from "./queries.generated";

export const GetAuthorsDocumentMock: MockedResponse = {
  request: {
    query: GetAuthorsDocument
  },
  result: {
    data: {
      authors: [
        createAuthor({ id: "1", name: "J. K. Rowling" }),
        createAuthor({ id: "2", name: "Andrzej Sapkowski" })
      ]
    }
  }
};

export const GetAuthorsDocumentErrorMock: MockedResponse = {
  request: {
    query: GetAuthorsDocument
  },
  error: new Error()
};
