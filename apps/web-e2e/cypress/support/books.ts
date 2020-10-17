Cypress.Commands.add(
  "findBookCard",
  { prevSubject: ["optional", "element"] },
  (subject, title) => {
    Cypress.log({ name: "findBookCard" });

    const root = subject ? cy.wrap(subject) : cy.root();
    return root.findAllByTestId(`book-card:${title}`);
  }
);

Cypress.Commands.add(
  "findFavouriteBookButton",
  { prevSubject: ["optional", "element"] },
  () => {
    Cypress.log({ name: "findFavouriteBookButton" });
    return cy.findAllByTestId(`favourite-book-button`);
  }
);

Cypress.Commands.add(
  "findBookCopyCards",
  { prevSubject: ["optional", "element"] },
  (subject, title) => {
    Cypress.log({ name: "findBookCopyCards" });

    const root = subject ? cy.wrap(subject) : cy.root();
    return root.findAllByTestId(`book-copy-card:${title}`);
  }
);

Cypress.Commands.add(
  "findBookCopyOwnerAvatar",
  { prevSubject: ["optional", "element"] },
  (subject, name) => {
    Cypress.log({ name: "findBookCopyOwnerAvatar" });

    const root = subject ? cy.wrap(subject) : cy.root();
    return root.findByTestId("book-copy-card-owner").findUserAvatar(name);
  }
);

Cypress.Commands.add("findBookCopyBorrowerAvatar", (name) => {
  Cypress.log({ name: "findBookCopyBorrowerAvatar" });

  if (name) {
    return cy.findByTestId("book-copy-card-borrower").findUserAvatar(name);
  }

  return cy.findByTestId("book-copy-card-borrower");
});

export {};

declare global {
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable {
      findBookCard: (name: string) => Chainable<JQuery>;
      findFavouriteBookButton: () => Chainable<JQuery>;
      findBookCopyCards: (name: string) => Chainable<JQuery>;
      findBookCopyOwnerAvatar: (name: string) => Chainable<JQuery>;
      findBookCopyBorrowerAvatar: (name?: string) => Chainable<JQuery>;
    }
  }
}
