function fillInSignupFormAndSubmit({
  name,
  email,
  password,
  passwordConfirmation
}: {
  name?: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string;
} = {}) {
  cy.get("form").within(() => {
    cy.findByLabelText("Name").clear();
    if (name) {
      cy.findByLabelText("Name").type(name);
    }

    cy.findByLabelText("Email").clear();
    if (email) {
      cy.findByLabelText("Email").type(email);
    }

    cy.findByLabelText("Password").clear();
    if (password) {
      cy.findByLabelText("Password").type(password);
    }

    cy.findByLabelText("Password confirmation").clear();
    if (passwordConfirmation) {
      cy.findByLabelText("Password confirmation").type(passwordConfirmation);
    }

    cy.findByText("Signup").click();
  });
}

describe("signup flow", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("nav").findByText("Signup").click();
  });

  it("validates the signup form", () => {
    fillInSignupFormAndSubmit({ name: "", email: "", password: "" });
    cy.findByText("name is a required field");
    cy.findByText("email is a required field");
    cy.findByText("password is a required field");

    fillInSignupFormAndSubmit({ email: "invalid", password: "" });
    cy.findByText("email must be a valid email");

    fillInSignupFormAndSubmit({
      name: "Luke",
      email: "luke@email.com",
      password: "short"
    });
    cy.findByText("email must be a valid email").should("not.exist");
    cy.findByText("password must be at least 6 characters");

    fillInSignupFormAndSubmit({
      name: "Luke",
      email: "luke@email.com",
      password: "password",
      passwordConfirmation: "passwd1234"
    });
    cy.findByText("Passwords don't match");
  });

  it("does not allow to signup when the email is taken", () => {
    fillInSignupFormAndSubmit({
      name: "Luke",
      email: "bob@example.com",
      password: "password",
      passwordConfirmation: "password"
    });
    cy.findByText("The given email is already taken!");
  });

  it("allows to signup and login a user", () => {
    cy.seed();

    fillInSignupFormAndSubmit({
      name: "Anna",
      email: "anna@example.com",
      password: "password",
      passwordConfirmation: "password"
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
