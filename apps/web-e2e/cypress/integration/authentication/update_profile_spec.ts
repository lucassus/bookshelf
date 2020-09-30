describe("profile page", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/");

    cy.openUserMenu();
    cy.findByTestId("user-menu").within(() => {
      cy.findByText("Profile").click();
    });

    cy.location("pathname").should("equal", "/my/profile");
  });

  it("validates the form", () => {
    cy.get("form").within(() => {
      cy.findByLabelText("Email").clear();
      cy.findByLabelText("Name").clear();
      cy.findByText("email is a required field").should("exist");
      cy.findByText("name is a required field").should("exist");

      cy.findByLabelText("Name").type("Bob");
      cy.findByLabelText("Email").type("dan@example.com");
      cy.findByText("Update").click();

      cy.findByText("The given email is already taken!").should("exist");
    });
  });

  it("updates the profile info", () => {
    cy.get("form").within(() => {
      cy.findByLabelText("Name")
        .should("have.value", "Bob")
        .clear()
        .type("Łukasz Bandzarewicz");

      cy.findByLabelText("Email").should("have.value", "bob@example.com");

      cy.findByLabelText("Info").clear().type("Foo bar");

      cy.findByText("Update").click();
    });

    cy.openUserMenu();
    cy.findByTestId("user-menu").within(() => {
      cy.findByText("Łukasz Bandzarewicz").should("exist");
      cy.findByText("Profile").click();
    });

    cy.get("form").within(() => {
      cy.findByLabelText("Name").should("have.value", "Łukasz Bandzarewicz");
      cy.findByLabelText("Email").should("have.value", "bob@example.com");
      cy.findByLabelText("Info").should("have.value", "Foo bar");
    });
  });

  it("updates the email", () => {
    cy.get("form").within(() => {
      cy.findByLabelText("Email")
        .should("have.value", "bob@example.com")
        .clear()
        .type("bob@gmail.com");
      cy.findByText("Update").click();
    });

    cy.openUserMenu();
    cy.findByTestId("user-menu").within(() => {
      cy.findByText("Bob").should("exist");
      cy.findByText("bob@gmail.com").should("exist");

      cy.findByText("Profile").click();
    });

    cy.get("form").within(() => {
      cy.findByLabelText("Email").should("have.value", "bob@gmail.com");
    });

    cy.reload();
    cy.get("nav").findUserAvatar("Bob").should("exist");
  });
});
