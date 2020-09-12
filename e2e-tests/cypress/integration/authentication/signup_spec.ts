describe("signup flow", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("nav").findByText("Signup").click();
  });

  it("validates the signup form", () => {
    cy.get("form").within(() => {
      cy.findByText("Signup").click();

      cy.findByText("name is a required field");
      cy.findByText("email is a required field");
      cy.findByText("password is a required field");

      cy.findByLabelText("Email").type("invalid");
      cy.findByText("email must be a valid email");

      cy.findByLabelText("Name").type("Luke");
      cy.findByLabelText("Email").clear().type("luke@email.com");
      cy.findByLabelText("Password").type("short");

      cy.findByText("email must be a valid email").should("not.exist");
      cy.findByText("password must be at least 6 characters");

      cy.findByLabelText("Password").clear().type("password");
      cy.findByLabelText("Password confirmation").type("password123");

      cy.findByText("Passwords don't match");
    });
  });

  it("does not allow to signup when the email is taken", () => {
    cy.get("form").within(() => {
      cy.findByLabelText("Name").type("Bob");
      cy.findByLabelText("Email").type("bob@example.com");
      cy.findByLabelText("Password").type("password");
      cy.findByLabelText("Password confirmation").type("password");

      cy.findByText("Signup").click();

      cy.findByText("The given email is already taken!");
    });
  });

  it("allows to signup and login a user", () => {
    cy.get("form").within(() => {
      cy.findByLabelText("Name").type("Anna");
      cy.findByLabelText("Email").type("anna@email.com");
      cy.findByLabelText("Password").type("password");
      cy.findByLabelText("Password confirmation").type("password");

      cy.findByText("Signup").click();
    });

    cy.findByText("You are logged in as Anna");

    // TODO: Testing implementation details?
    cy.getCookie("bookshelf:authToken")
      .should("exist") // TODO: Randomly fails
      .then((cookie: any) => {
        expect(cookie.path).to.eq("/");
        expect(cookie.httpOnly).to.eq(true);
      });

    cy.reload();
    cy.findByText("You are logged in as Anna");
  });
});
