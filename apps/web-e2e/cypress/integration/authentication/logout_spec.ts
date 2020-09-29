it("allows to log out", () => {
  cy.login();
  cy.visit("/");

  cy.get("nav").findByTitle("Bob (bob@example.com)").click();
  cy.get("[data-cy=user-menu]").within(() => {
    cy.findByText("Log Out").click();
  });

  cy.location("pathname").should("equal", "/");

  cy.findByTitle("Bob (bob@example.com)").should("not.exist");
  cy.get("nav").findByText("Login").should("exist");
});
