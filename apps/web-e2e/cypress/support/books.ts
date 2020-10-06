Cypress.Commands.add(
  "findBookCopyCards",
  { prevSubject: ["optional", "element"] },
  (subject, title) => {
    const root = subject ? cy.wrap(subject) : cy.root();
    return root.findAllByTestId(`book-copy-card:${title}`);
  }
);

Cypress.Commands.add(
  "findBookCopyOwnerAvatar",
  { prevSubject: ["optional", "element"] },
  (subject, name) => {
    const root = subject ? cy.wrap(subject) : cy.root();
    return root.findByTestId("book-copy-card-owner").findUserAvatar(name);
  }
);

Cypress.Commands.add("findBookCopyBorrowerAvatar", (name) => {
  const borrower = cy.findByTestId("book-copy-card-borrower");
  if (name) {
    return borrower.findUserAvatar(name);
  }

  return borrower;
});

export {};

declare global {
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable {
      findBookCopyCards: (name: string) => Chainable<JQuery>;
      findBookCopyOwnerAvatar: (name: string) => Chainable<JQuery>;
      findBookCopyBorrowerAvatar: (name?: string) => Chainable<JQuery>;
    }
  }
}
