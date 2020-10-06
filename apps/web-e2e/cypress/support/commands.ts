const openUserMenu = () => {
  cy.get("nav")
    .findByTestId(/^avatar/)
    .should("exist")
    .parent("button")
    .click();

  return cy.findByTestId("user-menu");
};
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
      findUserCard: (name: string) => Chainable<JQuery>;
      findUserAvatar: (name: string) => Chainable<JQuery>;
    }
  }
}
