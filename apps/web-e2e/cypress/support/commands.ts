import { print } from "graphql";
import { ASTNode } from "graphql/language/ast";

Cypress.Commands.add(
  "gqlRequest",
  { prevSubject: false },
  ({ query, mutation, variables = {} }) => {
    return cy
      .request({
        url: `${Cypress.config().baseUrl}/graphql`,
        method: "POST",
        body: {
          query: print(query || mutation),
          variables
        }
      })
      .then((resp) => resp.body.data);
  }
);

Cypress.Commands.add(
  "findUserAvatar",
  { prevSubject: ["optional", "element"] },
  (subject, name) => {
    const root = subject ? cy.wrap(subject) : cy.root();
    return root.findByTestId(`avatar:${name}`);
  }
);

Cypress.Commands.add(
  "findUserCard",
  { prevSubject: ["optional", "element"] },
  (subject, name) => {
    const root = subject ? cy.wrap(subject) : cy.root();
    return root.findByTestId(`user-card:${name}`);
  }
);

export {};

declare global {
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable {
      gqlRequest: (options: {
        query?: ASTNode;
        mutation?: ASTNode;
        variables?: any;
      }) => Chainable<JQuery>;
      findUserCard: (name: string) => Chainable<JQuery>;
      findUserAvatar: (name: string) => Chainable<JQuery>;
    }
  }
}
