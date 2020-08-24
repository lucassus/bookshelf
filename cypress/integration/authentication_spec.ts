it("handles authentication flow", () => {
  cy.visit("/");
  cy.contains("Login").click();

  cy.get("form").within(() => {
    cy.get('input[name="email"]').type("bob@example.com");
    cy.get('input[name="password"]').type("password");
    cy.contains("Login").click();
  });

  cy.contains("You are logged in as Bob");
  cy.contains("Logout").click();
});
