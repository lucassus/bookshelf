describe("profile page", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/");

    cy.findByTitle("Bob (bob@example.com)").click();
    cy.get("[data-cy=user-menu]").within(() => {
      cy.findByText("Profile").click();
    });
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

  it("updates the profile", () => {
    cy.get("form").within(() => {
      cy.findByLabelText("Name").clear().type("Łukasz Bandzarewicz");
      cy.findByLabelText("Email").clear().type("lucassus@gmail.com");
      cy.findByLabelText("Info").clear().type("Foo bar");

      cy.findByText("Update").click();
    });

    cy.findByTitle("Łukasz Bandzarewicz (lucassus@gmail.com)").click();
    cy.get("[data-cy=user-menu]").within(() => {
      cy.findByText("Łukasz Bandzarewicz").should("exist");
      cy.findByText("lucassus@gmail.com").should("exist");

      cy.findByText("Profile").click();
    });

    cy.get("form").within(() => {
      cy.findByLabelText("Name").should("have.value", "Łukasz Bandzarewicz");
      cy.findByLabelText("Email").should("have.value", "lucassus@gmail.com");
      cy.findByLabelText("Info").should("have.value", "Foo bar");
    });
  });
});
