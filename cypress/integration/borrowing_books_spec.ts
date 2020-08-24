it("handles borrowing and returning books", () => {
  cy.seed();

  cy.visit("/");
  cy.contains("Login").click();

  cy.get("form").within(() => {
    cy.fixture("credentials.json").then(({ email, password }) => {
      cy.get('input[name="email"]').clear().type(email);
      cy.get('input[name="password"]').type(password);
    });

    cy.contains("Login").click();
  });

  cy.contains("Blood of Elves").click();
  cy.contains("borrow").click();
  cy.contains("return").click();
});
