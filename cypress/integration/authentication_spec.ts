it("handles the authentication flow", () => {
  cy.visit("/");
  cy.findByText("Login").click();

  cy.get("form").within(() => {
    cy.findByText("Login").click();
    cy.findByText("email is a required field");
    cy.findByText("password is a required field");

    cy.findByLabelText("Email").type("invalid");
    cy.findByText("email must be a valid email");

    cy.findByLabelText("Password").type("short");
    cy.findByText("password must be at least 6 characters");

    cy.fixture("credentials.json").then(({ email, password }) => {
      cy.findByLabelText("Email").clear().type(email);
      cy.findByLabelText("Password").clear().type(password);
    });

    cy.findByText("Login").click();
  });

  cy.findByText("You are logged in as Bob");
  cy.getCookie("bookshelf:authToken")
    .should("exist")
    .then((cookie: any) => {
      expect(cookie.path).to.eq("/");
      expect(cookie.httpOnly).to.eq(true);
    });

  cy.reload();
  cy.findByText("You are logged in as Bob");

  cy.findByText("Logout").click();
});
