function fillInLoginFormAndSubmit({
  email,
  password
}: { email?: string; password?: string } = {}) {
  cy.get("form").within(() => {
    cy.findByLabelText("Email").clear();
    if (email) {
      cy.findByLabelText("Email").type(email);
    }

    cy.findByLabelText("Password").clear();
    if (password) {
      cy.findByLabelText("Password").type(password);
    }

    cy.findByText("Login").click();
  });
}

function fillInLoginFormWithValidCredentialsAndSubmit() {
  cy.fixture("credentials.json").then(({ email, password }) => {
    fillInLoginFormAndSubmit({ email, password });
  });
}

beforeEach(() => {
  cy.visit("/");
  cy.findByText("Login").click();
});

it("validates the login form", () => {
  fillInLoginFormAndSubmit({ email: "", password: "" });
  cy.findByText("email is a required field");
  cy.findByText("password is a required field");

  fillInLoginFormAndSubmit({ email: "invalid", password: "" });
  cy.findByText("email must be a valid email");

  fillInLoginFormAndSubmit({ email: "valid@email.com", password: "short" });
  cy.findByText("email must be a valid email").should("not.exist");
  cy.findByText("password must be at least 6 characters");
});

it("allows to login with valid credentials", () => {
  fillInLoginFormWithValidCredentialsAndSubmit();

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

it("does not allow to login with invalid credentials", () => {
  fillInLoginFormAndSubmit({
    email: "invalid@email.com",
    password: "invalid password"
  });

  cy.findByText("You are logged in as Bob").should("not.exist");
});

it("reuses the old authentication token", () => {
  fillInLoginFormWithValidCredentialsAndSubmit();

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
