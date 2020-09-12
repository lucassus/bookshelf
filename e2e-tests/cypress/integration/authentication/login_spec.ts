function fillInLoginFormWithValidCredentialsAndSubmit() {
  cy.fixture("credentials.json").then(({ email, password }) => {
    cy.get("form").within(() => {
      cy.findByLabelText("Email").clear().type(email);
      cy.findByLabelText("Password").clear().type(password);
      cy.findByText("Login").click();
    });
  });
}

describe("login flow", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("nav").findByText("Login").click();
  });

  it("validates the login form", () => {
    cy.get("form").within(() => {
      cy.findByText("Login").click();
      cy.findByText("email is a required field");
      cy.findByText("password is a required field");

      cy.findByLabelText("Email").type("invalid");
      cy.findByText("email must be a valid email");

      cy.findByLabelText("Email").clear().type("valid@email.com");
      cy.findByLabelText("Password").type("hort");

      cy.findByText("email must be a valid email").should("not.exist");
      cy.findByText("password must be at least 6 characters");
    });
  });

  it("allows to login with valid credentials", () => {
    fillInLoginFormWithValidCredentialsAndSubmit();

    cy.url().should("eq", `${Cypress.config().baseUrl}/`);

    cy.getCookie("bookshelf:authToken")
      .should("exist")
      .then((cookie: any) => {
        expect(cookie.path).to.eq("/");
        expect(cookie.httpOnly).to.eq(true);
      });
    cy.findByText("You are logged in as Bob");

    cy.reload();
    cy.findByText("You are logged in as Bob");

    cy.findByText("Logout").click();
  });

  it("does not allow to login with invalid credentials", () => {
    cy.get("form").within(() => {
      cy.findByLabelText("Email").type("invalid@email.com");
      cy.findByLabelText("Password").type("invalid password");
      cy.findByText("Login").click();
    });

    cy.findByText("Invalid email or password!").should("exist");
    cy.findByText("You are logged in as Bob").should("not.exist");
  });

  // TODO: Testing implementation details?
  it("reuses the old authentication token", () => {
    fillInLoginFormWithValidCredentialsAndSubmit();

    cy.findByText("You are logged in as Bob");

    // Save the auth cookie
    let authCookie: any = null;
    cy.getCookie("bookshelf:authToken")
      .should("exist")
      .then((cookie) => {
        authCookie = cookie;
      });

    cy.findByText("Logout").click();

    // Restore the auth cookie
    cy.findByText("You are logged in as Bob")
      .should("not.exist")
      .then(() => {
        const { name, value, ...options } = authCookie;
        cy.setCookie(name, value, options);
      });

    cy.reload();
    cy.findByText("You are logged in as Bob");
  });
});
