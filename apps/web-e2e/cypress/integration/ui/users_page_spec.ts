describe("Users page", () => {
  it("displays list of users", () => {
    cy.visit("/");
    cy.get("nav").findByText("Users").click();

    cy.findAllByTestId(/^user-card/).should("have.length", 5);

    cy.findUserCard("Alice").should("exist");
    cy.findUserCard("Bob").should("exist");
    cy.findUserCard("Celine").should("exist");
    cy.findUserCard("Dan").should("exist");
    cy.findUserCard("Luke").should("exist");
  });

  it("logged in user should see his email address", () => {
    cy.login();

    cy.visit("/");
    cy.get("nav").findByText("Users").click();

    cy.findUserCard("Bob").within(() => {
      cy.findByText("Bob <bob@example.com>").should("exist");
    });

    cy.findUserCard("Alice").within(() => {
      cy.findByText("Alice").should("exist");
      cy.findByText("Alice <alice@example.com>").should("not.exist");
    });
  });

  it("logged in admin should see all email addresses", () => {
    cy.login({ as: "admin" });

    cy.visit("/");
    cy.get("nav").findByText("Users").click();

    cy.findUserCard("Bob").within(() => {
      cy.findByText("Bob <bob@example.com>").should("exist");
    });

    cy.findUserCard("Alice").within(() => {
      cy.findByText("Alice <alice@example.com>").should("exist");
    });

    cy.findUserCard("Luke").within(() => {
      cy.findByText("Luke <luke@example.com>").should("exist");
    });
  });
});
