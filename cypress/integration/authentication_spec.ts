beforeEach(() => {
  cy.visit("/");
  cy.findByText("Login").click();
});

it("validates the login form", () => {
  cy.get("form").within(() => {
    cy.findByText("Login").click();
    cy.findByText("email is a required field");
    cy.findByText("password is a required field");

    cy.findByLabelText("Email").type("invalid");
    cy.findByText("email must be a valid email");

    cy.findByLabelText("Password").type("short");
    cy.findByText("password must be at least 6 characters");
  });
});

it("allows to login with valid credentials", () => {
  cy.get("form").within(() => {
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

it("can reuse the old authentication token", () => {
  cy.get("form").within(() => {
    cy.fixture("credentials.json").then(({ email, password }) => {
      cy.findByLabelText("Email").clear().type(email);
      cy.findByLabelText("Password").clear().type(password);
    });

    cy.findByText("Login").click();
  });

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

it("does not allow to login with invalid credentials", () => {
  cy.get("form").within(() => {
    cy.fixture("credentials.json").then(({ email }) => {
      cy.findByLabelText("Email").clear().type(email);
      cy.findByLabelText("Password").clear().type("invalid password");
    });

    cy.findByText("Login").click();
  });

  cy.findByText("You are logged in as Bob").should("not.exist");
});
