import { print } from "graphql";
import gql from "graphql-tag";

const seed = () => {
  return cy
    .request({
      method: "POST",
      url: "/api/seed"
    })
    .then((response) => response.body);
};

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

const openUserMenu = () =>
  cy
    .get("nav")
    .findByTestId(/^avatar/)
    .click();

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      seed: typeof seed;
      login: typeof login;
      openUserMenu: typeof openUserMenu;
    }
  }
}

Cypress.Commands.add("seed", seed);
Cypress.Commands.add("login", login);
Cypress.Commands.add("openUserMenu", openUserMenu);
