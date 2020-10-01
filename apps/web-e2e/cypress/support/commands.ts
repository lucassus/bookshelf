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

// TODO: Move to a separate file, like authentication
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
    .should("exist")
    .parent("button")
    .click();

// TODO: Fix typings
const findUserAvatar = (subject, name) => {
  const root = subject ? cy.wrap(subject) : cy.root();
  return root.findByTestId(`avatar:${name}`);
};

// TODO: Fix typings
const findBookCopies = (subject, title) => {
  const root = subject ? cy.wrap(subject) : cy.root();
  return root.findAllByTestId(`book-copy:${title}`);
};

const findUserCard = (subject, name) => {
  const root = subject ? cy.wrap(subject) : cy.root();
  return root.findByTestId(`user-card:${name}`);
};

// TODO: Make it less tedious
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      seed: typeof seed;
      login: typeof login;
      openUserMenu: typeof openUserMenu;
      findUserAvatar: typeof findUserAvatar;
      findBookCopies: typeof findBookCopies;
      findUserCard: typeof findUserCard;
    }
  }
}

Cypress.Commands.add("seed", seed);
Cypress.Commands.add("login", login);
Cypress.Commands.add("openUserMenu", openUserMenu);
Cypress.Commands.add(
  "findUserAvatar",
  { prevSubject: ["optional", "element"] },
  findUserAvatar
);
Cypress.Commands.add(
  "findBookCopies",
  { prevSubject: ["optional", "element"] },
  findBookCopies
);
Cypress.Commands.add(
  "findUserCard",
  { prevSubject: ["optional", "element"] },
  findUserCard
);
