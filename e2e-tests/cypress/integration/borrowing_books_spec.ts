it("handles borrowing and returning books", () => {
  cy.seed();

  // TODO: Faster login
  cy.visit("/");
  cy.findByText("Login").click();

  cy.get("form").within(() => {
    cy.fixture("credentials.json").then(({ email, password }) => {
      cy.findByLabelText("Email").type(email);
      cy.findByLabelText("Password").type(password);
    });

    cy.findByText("Login").click();
  });

  cy.findByText("Blood of Elves").click();
  cy.findByText("borrow").click();
  cy.findByText("return").click();
});
