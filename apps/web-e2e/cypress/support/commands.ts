import { print } from "graphql";
import gql from "graphql-tag";

/* eslint-disable */
declare global {
  namespace Cypress {
    interface Chainable {
      seed: typeof seed;
      login: typeof login;
      loginAs: typeof loginAs;
    }
  }
}
/* eslint-enable */

const seed = () => {
  return cy
    .request({
      method: "POST",
      url: "/api/seed"
    })
    .then((response) => response.body);
};

const login = () => {
  return cy.fixture("credentials.json").then(({ email, password }) => {
    return cy.loginAs({ email, password });
  });
};

const loginAs = ({ email, password }: { email: string; password: string }) => {
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
};

Cypress.Commands.add("seed", seed);
Cypress.Commands.add("login", login);
Cypress.Commands.add("loginAs", loginAs);
