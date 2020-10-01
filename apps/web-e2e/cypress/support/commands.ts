const openUserMenu = () =>
  cy
    .get("nav")
    .findByTestId(/^avatar/)
    .should("exist")
    .parent("button")
    .click();
Cypress.Commands.add("openUserMenu", openUserMenu);

Cypress.Commands.add(
  "findUserAvatar",
  { prevSubject: ["optional", "element"] },
  (subject, name) => {
    const root = subject ? cy.wrap(subject) : cy.root();
    return root.findByTestId(`avatar:${name}`);
  }
);

Cypress.Commands.add(
  "findBookCopies",
  { prevSubject: ["optional", "element"] },
  (subject, title) => {
    const root = subject ? cy.wrap(subject) : cy.root();
    return root.findAllByTestId(`book-copy:${title}`);
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
      openUserMenu: typeof openUserMenu;
      findUserAvatar: (name: string) => Chainable<JQuery>;
      findBookCopies: (name: string) => Chainable<JQuery>;
      findUserCard: (name: string) => Chainable<JQuery>;
    }
  }
}
