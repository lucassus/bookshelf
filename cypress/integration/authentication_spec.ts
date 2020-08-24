it("handles the authentication flow", () => {
  cy.visit("/");
  cy.contains("Login").click();

  cy.get("form").within(() => {
    cy.contains("Login").click();
    cy.contains("email is a required field");
    cy.contains("password is a required field");

    cy.get('input[name="email"]').type("invalid");
    cy.contains("email must be a valid email");

    cy.get('input[name="email"]').clear().type("bob@example.com");
    cy.get('input[name="password"]').type("password");

    cy.contains("Login").click();
  });

  cy.contains("You are logged in as Bob");

  cy.reload();
  cy.contains("You are logged in as Bob");

  cy.contains("Logout").click();
});
