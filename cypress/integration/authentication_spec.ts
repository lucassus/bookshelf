beforeEach(() => {
  cy.visit("/");
  cy.findByText("Login").click();
});

function fillInLoginFormAndSubmit({
  email,
  password
}: { email?: string; password?: string } = {}) {
  cy.get("form").within(() => {
    cy.findByLabelText("Email").clear();
    cy.findByLabelText("Password").clear();

    cy.fixture("credentials.json").then(
      ({ email: validEmail, password: validPassword }) => {
        let text = email ?? validEmail;
        if (text !== "") {
          cy.findByLabelText("Email").type(text);
        }

        text = password ?? validPassword;
        if (text !== "") {
          cy.findByLabelText("Password").type(text);
        }
      }
    );

    cy.findByText("Login").click();
  });
}

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
  fillInLoginFormAndSubmit();

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
  fillInLoginFormAndSubmit({ password: "invalid password" });
  cy.findByText("You are logged in as Bob").should("not.exist");
});

it("reuses the old authentication token", () => {
  fillInLoginFormAndSubmit();

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
