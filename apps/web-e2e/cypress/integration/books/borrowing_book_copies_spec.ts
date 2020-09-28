it("handles borrowing book copies", () => {
  cy.login();
  cy.visit("/");

  cy.visit("/my/books");
  cy.get("[data-testid=borrowed-book-copies-list]").within(() => {
    cy.findByText("Borrowed book copies (1)").should("exist");
  });

  cy.get("nav").within(() => {
    cy.findByText("Books").click();
  });
  cy.findByText("Blood of Elves").click();
  cy.findByText("borrow").click();

  // TODO: Figure out how to dry it
  cy.get("nav").within(() => {
    cy.get("[data-cy=user-menu-button]").click();
  });
  cy.get("[data-cy=user-menu]").within(() => {
    cy.findByText("Books").click();
  });

  cy.get("[data-testid=borrowed-book-copies-list]").within(() => {
    cy.findByText("Borrowed book copies (2)").should("exist");
  });
});
