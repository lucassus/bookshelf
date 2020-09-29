describe("Users page", () => {
  it("displays list of users", () => {
    cy.visit("/");
    cy.get("nav").findByText("Users").click();

    cy.findAllByTestId(/^user-card/).should("have.length", 5);

    cy.findByTestId("user-card:Alice").should("exist");
    cy.findByTestId("user-card:Bob").should("exist");
    cy.findByTestId("user-card:Celine").should("exist");
    cy.findByTestId("user-card:Dan").should("exist");
    cy.findByTestId("user-card:Luke").should("exist");
  });

  it("logged in user should see his email address", () => {
    cy.login();

    cy.visit("/");
    cy.get("nav").findByText("Users").click();

    cy.findAllByTestId("user-card:Bob").within(() => {
      cy.findByText("Bob <bob@example.com>").should("exist");
    });

    cy.findAllByTestId("user-card:Alice").within(() => {
      cy.findByText("Alice").should("exist");
      cy.findByText("Alice <alice@example.com>").should("not.exist");
    });
  });

  it("logged in admin should see all email addresses", () => {
    cy.login({ as: "admin" });

    cy.visit("/");
    cy.get("nav").findByText("Users").click();

    cy.findAllByTestId("user-card:Bob").within(() => {
      cy.findByText("Bob <bob@example.com>").should("exist");
    });

    cy.findAllByTestId("user-card:Alice").within(() => {
      cy.findByText("Alice <alice@example.com>").should("exist");
    });

    cy.findAllByTestId("user-card:Luke").within(() => {
      cy.findByText("Luke <luke@example.com>").should("exist");
    });
  });
});
