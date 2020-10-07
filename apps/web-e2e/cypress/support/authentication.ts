import { print } from "graphql";
import gql from "graphql-tag";

const login = ({ as = "user" }: { as?: "user" | "admin" } = {}) => {
  return cy.fixture("credentials.json").then((credentials) => {
    const { email, password } = credentials[as];

    const log = Cypress.log({
      name: "login",
      message: `Logging as ${email} (${as})`,
      // @ts-ignore
      autoEnd: false
    });

    return cy
      .request({
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
      })
      .then(() => log.end());
  });
};

Cypress.Commands.add("login", login);

const openUserMenu = () => {
  Cypress.log({ name: "openUserMenu" });

  cy.get("nav")
    .findByTestId(/^avatar/)
    .should("exist")
    .parent("button")
    .click();

  return cy.findByTestId("user-menu");
};

Cypress.Commands.add("openUserMenu", openUserMenu);

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      login: typeof login;
      openUserMenu: typeof openUserMenu;
    }
  }
}
