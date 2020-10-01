import { print } from "graphql";
import gql from "graphql-tag";

const login = ({ as = "user" }: { as?: "user" | "admin" } = {}) => {
  return cy.fixture("credentials.json").then((credentials) => {
    const { email, password } = credentials[as];
    return cy.request({
      url: `${Cypress.config().baseUrl}/graphql`,
      method: "POST",
      body: {
        query: print(gql`
          mutation($input: LoginInput!) {
            login(input: $input) {
              __typename
            }
          }
        `),
        variables: { input: { email, password } }
      }
    });
  });
};

Cypress.Commands.add("login", login);

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      login: typeof login;
    }
  }
}
