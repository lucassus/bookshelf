describe("My profile page", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/");

    cy.openUserMenu().within(() => {
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
    const newName = "John";
    const newInfo = "Foo bar";

    cy.get("form").within(() => {
      cy.findByLabelText("Name")
        .should("have.value", "Bob")
        .clear()
        .type(newName);

      cy.findByLabelText("Email").should("have.value", "bob@example.com");

      cy.findByLabelText("Info")
        .should(
          "have.value",
          "Twitter fan. Social media expert. Hardcore explorer. Communicator. Amateur coffee lover."
        )
        .clear()
        .type(newInfo);

      cy.findByText("Update").click();
    });

    cy.openUserMenu().within(() => {
      cy.findByText(newName).should("exist");
      cy.findByText("Profile").click();
    });

    cy.get("form").within(() => {
      cy.findByLabelText("Name").should("have.value", newName);
      cy.findByLabelText("Email").should("have.value", "bob@example.com");
      cy.findByLabelText("Info").should("have.value", newInfo);
    });

    cy.get("nav").findByText("Users").click();
    cy.findByTestId("users-list").findUserAvatar(newName).click();
    cy.findByText(newInfo).should("exist");
  });

  it("updates the email", () => {
    const newEmail = "john@example.com";

    cy.get("form").within(() => {
      cy.findByLabelText("Email")
        .should("have.value", "bob@example.com")
        .clear()
        .type(newEmail);
      cy.findByText("Update").click();
    });

    cy.openUserMenu().within(() => {
      cy.findByText("Bob").should("exist");
      cy.findByText(newEmail).should("exist");

      cy.findByText("Profile").click();
    });

    cy.get("form").within(() => {
      cy.findByLabelText("Email").should("have.value", newEmail);
    });

    // Do not logout a user after email change
    cy.reload();
    cy.get("nav").findUserAvatar("Bob").should("exist");
  });

  it("is accessible only for logged in users", () => {
    cy.openUserMenu().within(() => {
      cy.findByText("Log Out").click();
    });

    cy.visit("/my/profile");
    cy.findByText("Page not found!").should("exist");
  });
});
