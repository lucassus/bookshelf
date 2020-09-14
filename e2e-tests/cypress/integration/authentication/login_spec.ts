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

    cy.get("[data-cy=user-menu-button]").should("exist");

    cy.reload();
    cy.get("[data-cy=user-menu-button]").should("exist");

    cy.get("[data-cy=user-menu-button]").click();
    cy.get("[data-cy=user-menu]").within(() => {
      cy.findByText("Log Out").click();
    });
  });

  it("does not allow to login with invalid credentials", () => {
    cy.get("form").within(() => {
      cy.findByLabelText("Email").type("invalid@email.com");
      cy.findByLabelText("Password").type("invalid password");
      cy.findByText("Login").click();
    });

    cy.findByText("Invalid email or password!").should("exist");
    cy.get("[data-cy=user-menu-button]").should("not.exist");
  });

  it("reuses the old authentication token", () => {
    fillInLoginFormWithValidCredentialsAndSubmit();

    cy.get("[data-cy=user-menu-button]").should("exist");

    // Save the auth cookie
    let authCookie: any = null;
    cy.getCookie("bookshelf:authToken")
      .should("exist")
      .then((cookie) => {
        authCookie = cookie;
      });

    cy.get("[data-cy=user-menu-button]").click();
    cy.get("[data-cy=user-menu]").within(() => {
      cy.findByText("Log Out").click();
    });

    // Restore the auth cookie
    cy.get("[data-cy=user-menu-button]")
      .should("not.exist")
      .then(() => {
        const { name, value, ...options } = authCookie;
        cy.setCookie(name, value, options);
      });

    cy.reload();
    cy.get("[data-cy=user-menu-button]").should("exist");
  });
});
