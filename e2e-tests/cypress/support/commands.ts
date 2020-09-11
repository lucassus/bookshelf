import { print } from "graphql";
import gql from "graphql-tag";

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      seed: typeof seed;
      login: typeof login;
    }
  }
}

export const seed = () => {
  return cy
    .request({
      method: "POST",
      url: "/api/seed"
    })
    .then((response) => response.body);
};

export const login = () => {
  return cy.fixture("credentials.json").then(({ email, password }) => {
    cy.request({
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

Cypress.Commands.add("seed", seed);
Cypress.Commands.add("login", login);
