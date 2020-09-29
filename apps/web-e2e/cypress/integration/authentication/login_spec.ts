function fillInLoginFormWithValidCredentialsAndSubmit() {
  cy.fixture("credentials.json").then((credentials) => {
    const { email, password } = credentials.user;

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
    cy.location("pathname").should("equal", "/login");
  });

  it("validates the login form", () => {
    cy.get("form").within(() => {
      cy.findByText("Login").click();
      cy.findByText("email is a required field").should("exist");
      cy.findByText("password is a required field").should("exist");

      cy.findByLabelText("Email").type("invalid");
      cy.findByText("email must be a valid email").should("exist");

      cy.findByLabelText("Email").clear().type("valid@email.com");
      cy.findByLabelText("Password").type("hort");

      cy.findByText("email must be a valid email").should("not.exist");
      cy.findByText("password must be at least 6 characters").should("exist");
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

    cy.get("nav").findByTestId("avatar:Bob").should("exist");

    cy.reload();
    cy.get("nav").findByTestId("avatar:Bob").should("exist");

    cy.openUserMenu();
    cy.findByTestId("user-menu").within(() => {
      cy.findByText("Log Out").click();
    });
  });

  it("allows to login as admin", () => {
    // Load users as unauthenticated user
    cy.get("nav").findByText("Users").click();
    cy.findByText("dan@example.com").should("not.exist");
    cy.findByText("luke@example.com").should("not.exist");

    cy.get("nav").findByText("Login").click();

    cy.get("form").within(() => {
      cy.findByLabelText("Email").clear().type("luke@example.com");
      cy.findByLabelText("Password").clear().type("password");
      cy.findByText("Login").click();
    });

    cy.openUserMenu();
    cy.findByTestId("user-menu").within(() => {
      cy.findByText("Admin Account");
    });

    // Verify that list of users has been reloaded
    cy.get("nav").findByText("Users").click();
    cy.findByText("Dan <dan@example.com>").should("exist");
    cy.findByText("Luke <luke@example.com>").should("exist");
  });

  it("does not allow to login with invalid credentials", () => {
    cy.get("form").within(() => {
      cy.findByLabelText("Email").type("invalid@email.com");
      cy.findByLabelText("Password").type("invalid password");
      cy.findByText("Login").click();
    });

    cy.findByText("Invalid email or password!").should("exist");
    cy.get("nav").findByTestId("avatar:Bob").should("not.exist");
  });

  it("reuses the old authentication token", () => {
    fillInLoginFormWithValidCredentialsAndSubmit();

    cy.get("nav").findByTestId("avatar:Bob").should("exist");

    // Save the auth cookie
    let authCookie: any = null;
    cy.getCookie("bookshelf:authToken")
      .should("exist")
      .then((cookie) => {
        authCookie = cookie;
      });

    cy.openUserMenu();
    cy.findByTestId("user-menu").within(() => {
      cy.findByText("Log Out").click();
    });

    // Restore the auth cookie
    cy.get("nav")
      .findByTestId("avatar:Bob")
      .should("not.exist")
      .then(() => {
        const { name, value, ...options } = authCookie;
        cy.setCookie(name, value, options);
      });

    cy.reload();
    cy.get("nav").findByTestId("avatar:Bob").should("exist");
  });
});
