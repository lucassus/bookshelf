it("allows to log out", () => {
  cy.login();
  cy.visit("/");

  cy.findByTitle("Bob (bob@example.com)").click();

  cy.get("[data-cy=user-menu]").within(() => {
    cy.findByText("Log Out").click();
  });

  cy.findByTitle("Bob (bob@example.com)").should("not.exist");
  cy.findByText("Login").should("exist");
});
